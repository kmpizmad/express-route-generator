import { DirectoryNotFoundException } from '../../../src/common/errors';
import { FileManager } from '../../../src/common/utils/FileManager';

describe('FileManager', () => {
  const fileManager = new FileManager();

  it('Return an array of possible filenames', () => {
    expect(fileManager.setExtensions('sample', ['.js'])).toStrictEqual([
      'sample.js',
    ]);
  });

  it('Returns the content of a file', () => {
    expect(fileManager.readSchema('.', 'package.json')).toContain('version');
    expect(() => fileManager.readSchema('somePath', 'someFile')).toThrowError(
      new DirectoryNotFoundException('\'somePath\' is missing.') as Error
    );
  });
});
