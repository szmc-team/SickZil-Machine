import { Tensor, tensor3d, tensor2d } from '@tensorflow/tfjs';
import { PNG } from 'pngjs';
import fs from 'fs';
import { mapColor } from './image';

const readPng = (path: string) => {
  const buf = fs.readFileSync(path);
  const png = PNG.sync.read(buf);
  const arr = new Int32Array(png.data);
  return tensor3d(arr, [png.height, png.width, 4]);
};

const shallowEqual = <T>(xs: Array<T>, ys: Array<T>) =>
  (xs.length === ys.length && xs.every((e, i) => e === ys[i]));
const tensorEqual = (x: Tensor, y: Tensor) =>
  (shallowEqual(x.shape, y.shape)
  ? (!!x.equal(y).all().dataSync()[0]) : false);

test('tensorEqual', () => {
  const inp = tensor3d([[[1, 0, 0], [1, 0, 0]]]);
  const same = tensor3d([[[1, 0, 0], [1, 0, 0]]]);
  const diff = tensor3d([[[0, 0, 1], [0, 1, 0]]]);
  expect(tensorEqual(inp, same)).toBe(true);
  expect(tensorEqual(inp, diff)).toBe(false);

  const diffShape1 = tensor2d([[0, 0, 1], [0, 1, 0]]);
  const diffShape2 = tensor3d([[[0, 0], [0, 1]]]);
  expect(tensorEqual(inp, diffShape1)).toBe(false);
  expect(tensorEqual(inp, diffShape2)).toBe(false);
});

test('map rb tensor to wk', () => {
  const oneHot = tensor3d([
    [[1, 0, 0], [1, 0, 0], [1, 0, 0]],
    [[0, 0, 1], [0, 0, 1], [0, 0, 1]],
  ]);
  
  const expected = tensor3d([
    [[1, 1, 1], [1, 1, 1], [1, 1, 1]],
    [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
  ]);
  
  const mapping = tensor2d([
    [1,1,1],
    [1,1,1],
    [0,0,0],
  ])
  
  const mapped = mapColor(mapping, oneHot);
  expect(tensorEqual(mapped, expected)).toBe(true);
});

test('mock test', () => {
  const oneHot = readPng('./src/mocks/rgb_1hot.png');
  const expected = readPng('./src/mocks/wk_ans.png');
  // img.print();
  console.log(oneHot);
  console.log(expected);
});
