import { Tensor, matMul } from '@tensorflow/tfjs';

// map is mapping table(2d tensor), typically
// map.shape = [oneHot.shape.h * 3] (oneHot -> rgb)
// each rows are mapped color.
export const mapColor = (map:Tensor, oneHot: Tensor) => {
  const [h,w,c] = oneHot.shape
  return matMul(oneHot.as2D(h*w, c), map).as3D(h,w,c)
}
