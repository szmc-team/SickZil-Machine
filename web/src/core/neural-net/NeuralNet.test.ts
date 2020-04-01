/**
 * @jest-environment node
 */
import '@tensorflow/tfjs-node'
import * as tf from '@tensorflow/tfjs-node'
import fs from 'fs'
import { readPng, shallowEqual } from './nodeUtils'
import { genMask } from './NeuralNet'

test('inference small 16x image', async () => {
  const inp = readPng('./src/mocks/small16x.png')
  const out = (await genMask(inp)).mul(255)
  const pngArr = await tf.node.encodePng(out as tf.Tensor3D)
  fs.writeFileSync('chk.png', Buffer.from(pngArr), 'binary')
})
