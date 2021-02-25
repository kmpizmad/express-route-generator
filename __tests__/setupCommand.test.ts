import { execSync } from 'child_process';
import { writeFileSync } from 'fs';
import { setupCommand } from '../src/utils/commands/setupCommand';

describe('setupCommand', () => {
  it('returns config file', () => {
    writeFileSync('erg.config.js', '');

    expect(() => {
      setupCommand(true);
    }).not.toThrow();

    execSync('rm -rf erg.config.js');
  });
  it('returns undefined', () => {
    expect(() => {
      setupCommand(false);
    }).not.toThrow();
  });
});
