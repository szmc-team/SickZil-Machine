import {
  Tensor,
  Tensor3D,
  LayersModel,
  loadLayersModel,
} from '@tensorflow/tfjs'
import { readPng } from './nodeUtils'
import { rgb } from './image'

let _snet: LayersModel | null = null
const snet = async () =>
  _snet ? _snet : await loadLayersModel('file://public/snet/model.json')

export const genMask = async (image: Tensor3D): Promise<Tensor> => {
  const model = await snet()
  const img = rgb(image).expandDims()
  const segmap = (await model.predict(img)) as Tensor
  return segmap.squeeze([0]).round().cast('int32')
}
