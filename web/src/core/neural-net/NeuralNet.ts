import {
  Tensor,
  LayersModel,
  loadLayersModel,
  tensor3d,
} from '@tensorflow/tfjs'
import { rgb } from './image'

let _snet: LayersModel | null = null
const snet = async () =>
  _snet ? _snet : await loadLayersModel('file://public/snet/model.json')

/**
 * Generate mask from input image
 *
 * input image is Int32Array encoded in png format:
 * pixel value: 0 ~ 255, rgba (4channel) format
 *
 * return is promise<Int32Array> from tensor directly.
 * (return is not encoded png nor jpg..)
 * pixel value: 0 ~ 255, rgb (3channel)
 */
export const genMask = async (
  image: Int32Array,
  width: number,
  height: number
) => {
  const model = await snet()

  const inpTensor = tensor3d(image, [height, width, 4])
  const img = rgb(inpTensor).expandDims()
  const segmap = model.predict(img) as Tensor
  const outArr = await segmap
    .squeeze([0])
    .round()
    .mul(255)
    .cast('int32')
    .data()

  return Int32Array.from(outArr)
}
