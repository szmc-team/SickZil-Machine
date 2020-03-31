import * as tf from '@tensorflow/tfjs'
//import snet from '../../../public/snet/model.json'
//import snet from '~/../public/snet/model.json'

const tmp = async () => {
  //console.log(snet)
  tf.ones([1, 2, 3]).print()
  
  try {
    const model = await tf.loadLayersModel(
      //'https://localhost:3000/snet/model.json')
    'file://public/snet/model.json')
    console.log(model)
    console.log(typeof model)
  }
  catch(err) {
    console.log('failed:', err)
  }
}

export default tmp
