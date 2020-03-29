import * as tf from '@tensorflow/tfjs';
import { invert } from '../../utils/utils';
// import {invert} from '~/utils/utils' // need webpack setting

const f = () => {
  const srcDst = new Map([[1, 'a'], [2, 'b'], [3, 'c']]);
  console.log(invert(srcDst));
};

export default f;
