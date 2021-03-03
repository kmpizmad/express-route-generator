import { execSync } from 'child_process';
import { existsSync, lstatSync, readdirSync, readFile } from 'fs';
import { join } from 'path';
import { Schema } from '../../../src/common/schemes';

describe('Schema', () => {
  const schema = new Schema('sample', '// My test schema.');

  afterAll(() => execSync('rm -rf root'));

  it('Builds', async done => {
    const path = 'root';
    const ext = '.js';
    await schema.build(path, ext, jest.fn);

    const fullPath = join(path, schema.name) + ext;
    const files = readdirSync(path);

    expect(existsSync(fullPath)).toBeTruthy();
    expect(lstatSync(fullPath).isFile()).toBeTruthy();
    expect(files.includes(schema.name + ext)).toBeTruthy();

    readFile(fullPath, { encoding: 'utf-8' }, (_, data) =>
      expect(data).toBe('// My test schema.')
    );

    done();
  });
});
