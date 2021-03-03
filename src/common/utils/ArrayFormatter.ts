export class ArrayFormatter {
  /**
   * Divides an array based on a condition
   * @param arr
   * @param callback function that returns a boolean for every item
   * @returns a tuple with two arrays where
   *          the first array contains the falsy values and
   *          the second array contains the truthy values
   */
  public static divide<T>(
    arr: T[],
    callback: (item: T) => boolean
  ): [T[], T[]] {
    const output1: T[] = arr.filter(item => !callback(item));
    const output2: T[] = arr.filter(item => callback(item));

    return [output1, output2];
  }
}
