import * as tf from '@tensorflow/tfjs'

const tmp = async () => {
  tf.ones([1, 2, 3]).print()

  try {
    const model = await tf.loadLayersModel('file://public/snet/model.json')
    console.log(typeof model)
  } catch (err) {
    console.log('failed:', err)
  }
}

export default tmp
