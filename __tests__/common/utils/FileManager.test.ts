import { execSync } from 'child_process';
import { mkdirSync } from 'fs';
import {
  DirectoryNotFoundException,
  FileNotFoundException,
} from '../../../src/common/errors';
import { FileManager } from '../../../src/common/utils/FileManager';

describe('FileManager', () => {
  const fileManager = new FileManager();
  const directory = 'somePath';
  const filename = 'someFile';

  afterAll(() => execSync(`rm -rf ${directory}`));

  it('Return an array of possible filenames', () => {
    expect(fileManager.setExtensions('sample', ['.js'])).toStrictEqual([
      'sample.js',
    ]);
  });

  it('Returns the content of a file', () => {
    expect(fileManager.readSchema('.', 'package.json')).toContain('version');
  });

  it('Throws error if directory or file is missing', () => {
    expect(() => fileManager.readSchema(directory, filename)).toThrowError(
      new DirectoryNotFoundException(`'${directory}' is missing.`) as Error
    );

    mkdirSync(directory, { recursive: true });
    expect(() => fileManager.readSchema(directory, filename)).toThrowError(
      new FileNotFoundException(
        `'${filename}' schema is missing in '${directory}'.`
      ) as Error
    );
  });
});
