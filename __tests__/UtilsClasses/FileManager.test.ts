import { execSync } from 'child_process';
import { mkdirSync } from 'fs';
import { FileManager } from '../../src/utils/FileManager';

const folder = 'somePath';
const name = 'index';

beforeAll(() => mkdirSync(folder));
afterAll(() => execSync(`rm -rf ${folder}`));

describe('FileManager class', () => {
  it('setExtensions(): string[] works', () => {
    const filename = 'erg.config';
    expect(FileManager.setExtensions(filename, ['.js', '.ts'])).toStrictEqual([
      filename + '.js',
      filename + '.ts',
    ]);
  });

  it('readSchema(): string works', () => {});

  it('readSchema(): string throws error', () => {
    expect(() => {
      FileManager.readSchema(folder, name);
    }).toThrow();
  });
});
