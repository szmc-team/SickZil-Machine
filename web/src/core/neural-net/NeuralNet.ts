import {
  Tensor,
  Tensor3D,
  LayersModel,
  loadLayersModel,
  tensor3d,
} from '@tensorflow/tfjs'
import { rgb } from './image'

let _snet: LayersModel | null = null
const snet = async () =>
  _snet ? _snet : await loadLayersModel('file://public/snet/model.json')

export const genMask = async (
  image: Int32Array,
  width: number,
  height: number
) => {
  const model = await snet()

  const inpTensor = tensor3d(image, [height, width, 4])
  const img = rgb(inpTensor).expandDims()
  const segmap = (await model.predict(img)) as Tensor
  return segmap.squeeze([0]).round().cast('int32').mul(255)
}
