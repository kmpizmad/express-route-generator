import { Chalk } from '../../src/vendors/chalk';
import { green } from 'chalk';

describe('Chalk', () => {
  it('writeLine works', () => {
    expect(() => {
      Chalk.writeLine(green, 'Some text');
    }).not.toThrow();
  });

  it('log works', () => {
    expect(Chalk.log(green, 'Some text')).not.toThrow();
  });
});
