/**
 * @jest-environment node
 */
import '@tensorflow/tfjs-node'
import * as tf from '@tensorflow/tfjs-node'
import fs from 'fs'
import { genMask } from './NeuralNet'
import { PNG } from 'pngjs'

export const readPng = (path: string) => {
  const buf = fs.readFileSync(path)
  return PNG.sync.read(buf)
}

test('inference small 16x image', async () => {
  const png = readPng('./src/mocks/small16x.png')
  const inpArr = new Int32Array(png.data)
  const outArr = await genMask(inpArr, png.width, png.height)

  const outTensor = tf.tensor(outArr, [png.height, png.width, 3]) as tf.Tensor3D
  const pngArr = await tf.node.encodePng(outTensor)
  fs.writeFileSync('./output/check.png', Buffer.from(pngArr), 'binary')
})
