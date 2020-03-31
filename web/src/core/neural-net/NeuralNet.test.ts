/**
 * @jest-environment node
 */
import '@tensorflow/tfjs-node'

import tmp from './NeuralNet'
test('chk', async () => {
  // console.log(nn())
  // nn().print()
  await tmp()
  expect(true).toEqual(true)
})
