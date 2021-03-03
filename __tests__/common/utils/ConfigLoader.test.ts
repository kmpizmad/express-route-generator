import { FileNotFoundException } from '../../../src/common/errors';
import { ConfigLoader } from '../../../src/common/utils/ConfigLoader';

describe('ConfigLoader', () => {
  const configLoader = new ConfigLoader();

  it('Loads the config', () => {
    expect(configLoader.load(['package.json'])).toHaveProperty('version');
    expect(() => configLoader.load([])).toThrowError(
      new FileNotFoundException('Couldn\'t find any of these files: ') as Error
    );
  });
});
