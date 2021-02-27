import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { ConfigLoader } from '../../src/common/utils/ConfigLoader';

const filename = 'erg.config.js';

afterAll(() => execSync(`rm -rf ${filename}`));

describe('ConfigLoader class', () => {
  it('loads config file', () => {
    writeFileSync(filename, '');

    expect(() => ConfigLoader.load([filename])).not.toThrow();
    expect(ConfigLoader.load([filename])).toEqual({});
  });

  it('throws error', () => {
    expect(() => ConfigLoader.load([])).toThrow();
  });
});
