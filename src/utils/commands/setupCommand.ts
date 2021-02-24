import { Exception } from '../../errors';
import { Config } from '../../types';
import { ConfigLoader } from '../ConfigLoader';
import { FileManager } from '../FileManager';

export function setupCommand(
  condition: boolean,
  exception?: Exception
): Config | undefined {
  let config: Config | undefined;

  // Load config file
  if (condition) {
    config = ConfigLoader.load(
      FileManager.setExtensions('erg.config', ['.js', '.json']),
      exception
    );
  }

  return config;
}
