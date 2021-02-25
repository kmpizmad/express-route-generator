import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { setupCommand } from '../src/utils/commands/setupCommand';

describe('', () => {
  it('', () => {
    writeFileSync('erg.config.js', '');

    expect(() => {
      setupCommand(true);
    }).not.toThrow();

    execSync('rm -rf erg.config.js');
  });
});
