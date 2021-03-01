import { Exception } from '../../common/errors';
import { ConfigFile } from '../../common/types';
import { ConfigLoader } from '../../common/utils/ConfigLoader';
import { FileManager } from '../../common/utils/FileManager';

export abstract class CliCommand<T> {
  protected _config: ConfigFile | undefined;

  constructor(public options: T, loadConfig: boolean, exception: Exception) {
    this._config = this.__setupCommand(loadConfig, exception);
  }

  // * ------------------------------
  // * PRIVATE MEMBERS
  // * ------------------------------
  private __setupCommand(
    condition: boolean,
    exception?: Exception
  ): ConfigFile | undefined {
    if (condition) {
      return ConfigLoader.load(
        FileManager.setExtensions('erg.config', ['.js', '.json']),
        exception
      );
    } else {
      return undefined;
    }
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------

  // * ------------------------------
  // * ABSTRACT MEMBERS
  // * ------------------------------
  public abstract run(): void;
  // * ------------------------------
  // * END OF ABSTRACT MEMBERS
  // * ------------------------------
}
