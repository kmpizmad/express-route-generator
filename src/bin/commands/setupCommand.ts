import { Exception } from '../../common/errors';
import { ConfigFile } from '../../common/types';
import { ConfigLoader } from '../../common/utils/ConfigLoader';
import { FileManager } from '../../common/utils/FileManager';

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
