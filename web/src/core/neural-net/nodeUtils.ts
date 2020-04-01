import { tensor3d, Tensor } from '@tensorflow/tfjs'
import fs from 'fs'
import { PNG } from 'pngjs'

export const readPng = (path: string) => {
  const buf = fs.readFileSync(path)
  const png = PNG.sync.read(buf)
  const arr = new Int32Array(png.data)
  return tensor3d(arr, [png.height, png.width, 4])
}

export const shallowEqual = <T>(xs: Array<T>, ys: Array<T>) =>
  xs.length === ys.length && xs.every((e, i) => e === ys[i])

export const tensorEqual = (x: Tensor, y: Tensor) =>
  shallowEqual(x.shape, y.shape) ? !!x.equal(y).all().dataSync()[0] : false
