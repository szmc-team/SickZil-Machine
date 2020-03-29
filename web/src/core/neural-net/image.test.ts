import * as tf from '@tensorflow/tfjs';
import { PNG } from 'pngjs';
import fs from 'fs';
import f from './image';

const readPng = (path: string): tf.Tensor3D => {
  const buf = fs.readFileSync(path);
  const png = PNG.sync.read(buf);
  const arr = new Int32Array(png.data);
  return tf.tensor3d(arr, [png.height, png.width, 4]);
};

test('f', () => {
  const srcDstColor = new Map(
    [[[0, 0, 0], [0, 1]],
      [[1, 1, 1], [1, 0]]],
  );

  const img = readPng('./src/mocks/wk.png');
  img.print();
  console.log(img);
});
