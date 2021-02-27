import { Exception } from '../../errors';
import { ConfigFile } from '../../types';
import { ConfigLoader } from '../ConfigLoader';
import { FileManager } from '../FileManager';

export function setupCommand(
  condition: boolean,
  exception?: Exception
): ConfigFile | undefined {
  // Load config file
  if (condition) {
    return ConfigLoader.load(
      FileManager.setExtensions('erg.config', ['.js', '.json']),
      exception
    );
  } else {
    return undefined;
  }
}
