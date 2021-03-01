export class ArrayFormatter {
  public static divide<T>(
    arr: T[],
    callback: (item: T) => boolean
  ): [T[], T[]] {
    const output1: T[] = arr.filter(item => !callback(item));
    const output2: T[] = arr.filter(item => callback(item));

    return [output1, output2];
  }
}
