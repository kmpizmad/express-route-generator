import { execSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { FileManager } from '../../src/common/utils/FileManager';

const folder = 'somePath';
const name = 'index';

beforeEach(() => mkdirSync(folder));
afterEach(() => execSync(`rm -rf ${folder} ${name}`));

describe('FileManager class', () => {
  it('setExtensions(): string[] works', () => {
    const filename = 'erg.config';
    expect(FileManager.setExtensions(filename, ['.js', '.ts'])).toStrictEqual([
      filename + '.js',
      filename + '.ts',
    ]);
  });

  it('readSchema(): string works', () => {
    writeFileSync(join(folder, name), '');
    expect(() => {
      FileManager.readSchema(folder, name);
    }).not.toThrow();
  });

  it('readSchema(): string throws error', () => {
    expect(() => {
      FileManager.readSchema(folder, name);
    }).toThrow();
  });
});
