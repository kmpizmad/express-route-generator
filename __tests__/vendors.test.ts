import { Chalk } from '../src/vendors/chalk';
import { green } from 'chalk';

describe('Vendor tests', () => {
  it('console.log with color (chalk)', () => {
    expect(() => {
      Chalk.writeLine(green, 'Some text');
    }).not.toThrow();
  });
});
