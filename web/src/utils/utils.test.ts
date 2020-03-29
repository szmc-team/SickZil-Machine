import * as utils from './utils';

test('invert fn swap keys and values of object', () => {
  expect(utils.invert(new Map([[1, 'a'], [2, 'b'], [3, 'c']])))
    .toEqual(new Map([['a', 1], ['b', 2], ['c', 3]]));

  const srcDst = new Map([[1, 'a'], [2, 'b'], [3, 'c']]);
  expect(utils.invert(utils.invert(srcDst))).toEqual(srcDst);

  const srcDstColor = new Map(
    [[[0, 0, 0], [0, 1]],
     [[1, 1, 1], [1, 0]]],
  );
  expect(utils.invert(utils.invert(srcDstColor)))
    .toEqual(srcDstColor);
});
