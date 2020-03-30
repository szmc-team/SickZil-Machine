import '@tensorflow/tfjs-node'
import nn from './NeuralNet'

test('chk', () => {
  console.log(nn())
  nn().print()
  expect(true).toEqual(true)
})
