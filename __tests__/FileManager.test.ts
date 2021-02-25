import { execSync } from 'child_process';
import { mkdirSync } from 'fs';
import { FileNotFoundException } from '../src/errors';
import { FileManager } from '../src/utils/FileManager';

describe('FileManager class', () => {
  it('throws error', () => {
    const folder = 'somePath';
    const name = 'index';

    mkdirSync(folder);

    expect(() => {
      FileManager.readSchema(folder, name);
    }).toThrowError(
      new FileNotFoundException(
        `'${name}' schema is missing in '${folder}'.`
      ) as Error
    );

    execSync(`rm -rf ${folder}`);
  });
});
