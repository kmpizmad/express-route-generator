import { Exception } from '../../common/errors';
import { SchemaBuilder } from '../../common/schemes';
import { ConfigFile } from '../../common/types';
import { ConfigLoader } from '../../common/utils';

export abstract class CliCommand<T> {
  protected _options: T;
  protected _configLoader: ConfigLoader;
  protected _schemaBuilder: SchemaBuilder;
  protected _config: ConfigFile | undefined;

  constructor(
    options: T,
    configLoader: ConfigLoader,
    schemaBuilder: SchemaBuilder,
    files: string[],
    loadConfig: boolean,
    exception?: Exception
  ) {
    this._options = options;
    this._configLoader = configLoader;
    this._schemaBuilder = schemaBuilder;
    this._config = this.__loadConfig(files, loadConfig, exception);
  }

  // * ------------------------------
  // * PRIVATE MEMBERS
  // * ------------------------------
  private __loadConfig(
    arr: string[],
    condition: boolean,
    exception?: Exception
  ): ConfigFile | undefined {
    return condition ? this._configLoader.load(arr, exception) : undefined;
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------

  // * ------------------------------
  // * ABSTRACT MEMBERS
  // * ------------------------------
  public abstract run(callback: (path: string) => void): void;
  // * ------------------------------
  // * END OF ABSTRACT MEMBERS
  // * ------------------------------
}
