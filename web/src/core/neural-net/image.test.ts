import * as tf from '@tensorflow/tfjs';
import { PNG } from 'pngjs';
import fs from 'fs';
import { f, mapColor } from './image';

const readPng = (path: string): tf.Tensor3D => {
  const buf = fs.readFileSync(path);
  const png = PNG.sync.read(buf);
  const arr = new Int32Array(png.data);
  return tf.tensor3d(arr, [png.height, png.width, 4]);
};

const shallowEqual = <T>(xs: Array<T>, ys: Array<T>) =>
  (xs.length === ys.length && xs.every((e, i) => e === ys[i]));
const tensorEqual = (x: tf.Tensor, y: tf.Tensor) =>
  (shallowEqual(x.shape, y.shape)
  ? (!!x.equal(y).all().dataSync()[0]) : false);

test('f', () => {
  const img = readPng('./src/mocks/wk.png');
  // img.print();
  console.log(img);
});


test('tensorEqual', () => {
  const inp = tf.tensor3d([[[1, 0, 0], [1, 0, 0]]]);
  const same = tf.tensor3d([[[1, 0, 0], [1, 0, 0]]]);
  const diff = tf.tensor3d([[[0, 0, 1], [0, 1, 0]]]);
  expect(tensorEqual(inp, same)).toBe(true);
  expect(tensorEqual(inp, diff)).toBe(false);

  const diffShape1 = tf.tensor2d([[0, 0, 1], [0, 1, 0]]);
  const diffShape2 = tf.tensor3d([[[0, 0], [0, 1]]]);
  expect(tensorEqual(inp, diffShape1)).toBe(false);
  expect(tensorEqual(inp, diffShape2)).toBe(false);
});

test('map rb tensor to wk', () => {
  const srcDstColor = new Map([
    [[1, 0, 0], [1, 1, 1]],
    [[0, 0, 1], [0, 0, 0]],
  ]);

  const inp = tf.tensor3d([
    [[1, 0, 0], [1, 0, 0]], [[1, 0, 0]],
    [[0, 0, 1], [0, 0, 1]], [[0, 0, 1]],
  ]);

  const expected = tf.tensor3d([
    [[1, 1, 1], [1, 1, 1]], [[1, 1, 1]],
    [[0, 0, 0], [0, 0, 0]], [[0, 0, 0]],
  ]);

  const mapped = mapColor(srcDstColor, inp);
  expect(tensorEqual(mapped, expected)).toBe(true);
});
