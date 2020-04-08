import {
  Tensor,
  LayersModel,
  loadLayersModel,
  tensor3d,
} from '@tensorflow/tfjs'
import { moduloPad, rgb } from './image'

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
 *
 * @todo: model version control(16x limit would be changed!)
 */
export const genMask = async (
  image: Int32Array,
  height: number,
  width: number
) => {
  const model = await snet()

  const inpTensor = tensor3d(image, [height, width, 4])
  const padded = moduloPad(inpTensor)

  const inpBatch1 = rgb(padded).expandDims()
  const outBatch1 = model.predict(inpBatch1) as Tensor
  const segmap = outBatch1.squeeze([0])

  const unPadded = segmap.slice([0, 0], [height, width])
  const outArr = await unPadded
    .round().mul(255).cast('int32').data()

  return Int32Array.from(outArr)
}
