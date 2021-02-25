import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { FileNotFoundException } from '../src/errors';
import { ConfigLoader } from '../src/utils/ConfigLoader';
import { FileManager } from '../src/utils/FileManager';

describe('ConfigLoader class', () => {
  it('loads config file', () => {
    writeFileSync('erg.config.js', '');

    expect(() => {
      ConfigLoader.load(FileManager.setExtensions('erg.config', ['.js']));
    }).not.toThrow();

    execSync('rm -rf erg.config.js');
  });
  it('throws error if file(s) not found', () => {
    expect(() => {
      ConfigLoader.load(['someFile']);
    }).toThrowError(
      new FileNotFoundException(
        "Couldn't find any of these files: someFile"
      ) as Error
    );
  });
});
