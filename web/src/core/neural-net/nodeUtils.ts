import { Tensor } from '@tensorflow/tfjs'

export const shallowEqual = <T>(xs: Array<T>, ys: Array<T>) =>
  xs.length === ys.length && xs.every((e, i) => e === ys[i])

export const tensorEqual = (x: Tensor, y: Tensor) =>
  shallowEqual(x.shape, y.shape) ? !!x.equal(y).all().dataSync()[0] : false
