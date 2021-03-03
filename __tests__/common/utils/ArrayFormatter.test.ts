import { ArrayFormatter } from '../../../src/common/utils';

describe('ArrayFormatter', () => {
  it('Divides an array based on a condition', () => {
    const arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
    const [odd, even] = ArrayFormatter.divide(arr, item => item % 2 == 0);

    expect(odd).toStrictEqual([1, 3, 5, 7, 9]);
    expect(even).toStrictEqual([0, 2, 4, 6, 8]);
  });
});
