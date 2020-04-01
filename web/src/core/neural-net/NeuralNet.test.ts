/**
 * @jest-environment node
 */
//import '@tensorflow/tfjs-node'
import * as tf from '@tensorflow/tfjs-node'
import { readPng, shallowEqual } from './nodeUtils'
import { genMask } from './NeuralNet'

test('inference small 16x image', async () => {
  const inp = readPng('./src/mocks/small16x.png')
  const out = await genMask(inp)
  console.log(out)
  //console.log(tf.node.encodePng)

  //console.log(out.length)
  out.print()
  expect(true).toEqual(true)
})
