/**
 * @jest-environment node
 */
import '@tensorflow/tfjs-node'
import * as tf from '@tensorflow/tfjs-node'
import fs from 'fs-extra'
import { genMask } from './NeuralNet'
import { PNG } from 'pngjs'

const readPng = (path: string) => {
  const buf = fs.readFileSync(path)
  return PNG.sync.read(buf)
}

test('inference tiny 16x image', async () => {
  const png = readPng('./src/mocks/tiny16x.png')
  const inpArr = new Int32Array(png.data)
  const outArr = await genMask(inpArr, png.width, png.height)

  const outTensor = tf.tensor(outArr, [png.height, png.width, 3]) as tf.Tensor3D
  const pngArr = await tf.node.encodePng(outTensor)
  fs.outputFileSync('./output/tiny16x.png', Buffer.from(pngArr), 'binary')
})

test('inference 16x image', async () => {
  const png = readPng('./src/mocks/middle16x.png')
  const inpArr = new Int32Array(png.data)
  const outArr = await genMask(inpArr, png.width, png.height)

  const outTensor = tf.tensor(outArr, [png.height, png.width, 3]) as tf.Tensor3D
  const pngArr = await tf.node.encodePng(outTensor)
  fs.outputFileSync('./output/middle16x.png', Buffer.from(pngArr), 'binary')
})

test('inference unpadded image', async () => {
  const png = readPng('./src/mocks/middle.png')
  const inpArr = new Int32Array(png.data)
  const outArr = await genMask(inpArr, png.width, png.height)

  const outTensor = tf.tensor(outArr, [png.height, png.width, 3]) as tf.Tensor3D
  const pngArr = await tf.node.encodePng(outTensor)
  fs.outputFileSync('./output/midddle.png', Buffer.from(pngArr), 'binary')
})
