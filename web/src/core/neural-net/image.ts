import * as tf from '@tensorflow/tfjs';
import { invert } from '../../utils/utils';
// import {invert} from '~/utils/utils' // need webpack setting

export const f = () => {
  const srcDst = new Map([[1, 'a'], [2, 'b'], [3, 'c']]);
  console.log(invert(srcDst));
};

export const mapColor = <T, S>(map: Map<T, S>, tensor: tf.Tensor) => tf.tensor([1]);
