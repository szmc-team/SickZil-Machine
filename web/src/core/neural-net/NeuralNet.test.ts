/**
 * @jest-environment node
 */
import '@tensorflow/tfjs-node'
import * as tf from '@tensorflow/tfjs-node'
import fs from 'fs-extra'
import { genMask } from './NeuralNet'
import { PNG } from 'pngjs'

const FileToMask = async (
  inpPath: string
): Promise<[Int32Array, number, number]> => {
  const buf = fs.readFileSync(inpPath)
  const { data, height: h, width: w } = PNG.sync.read(buf)
  return [await genMask(new Int32Array(data), h, w), h, w]
}

const maskToFile = async (
  maskArr: Int32Array,
  h: number,
  w: number,
  outPath: string
): Promise<Uint8Array> => {
  const outTensor = tf.tensor(maskArr, [h, w, 3]) as tf.Tensor3D
  const pngArr = await tf.node.encodePng(outTensor)
  fs.outputFileSync(outPath, Buffer.from(pngArr), 'binary')
  return pngArr
}

describe('nn.maskGen', () => {
  it('can inference tiny 16x image', async () => {
    const [maskArr, h, w] = await FileToMask('./src/mocks/tiny16x.png')
    maskToFile(maskArr, h, w, './output/tiny16x.png')
  })

  it('can inference 16x image', async () => {
    const [maskArr, h, w] = await FileToMask('./src/mocks/middle16x.png')
    maskToFile(maskArr, h, w, './output/middle16x.png')
  })

  it('can inference unpadded image', async () => {
    const [maskArr, h, w] = await FileToMask('./src/mocks/middle.png')
    maskToFile(maskArr, h, w, './output/middle.png')
  })
})
