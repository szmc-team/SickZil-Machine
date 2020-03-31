import { Tensor, Tensor3D, matMul, stack } from '@tensorflow/tfjs'

/**
 * map is mapping table(2d tensor), typically
 *
 * map.shape = [oneHot.shape.h * 3] (oneHot -> rgb)
 *
 * each rows are mapped color.
 */
export const mapColor = (map: Tensor, oneHot: Tensor) => {
  const [h, w, c] = oneHot.shape
  return matMul(oneHot.as2D(h * w, c), map).as3D(h, w, c)
}
/**
 *
 * @todo add unit test
 */
export const rgb = (rgba: Tensor3D) => {
  // assert img.shape == [h,w,4]
  // Discard alpha channel
  const [r, g, b, a] = rgba.split(4, 2)
  return stack([r, g, b], 2).squeeze([-1])
}
