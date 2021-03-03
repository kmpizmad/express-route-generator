import { existsSync, lstatSync, readdirSync, rm } from 'fs';
import { join } from 'path';
import {
  FileNotFoundException,
  MissingParamsException,
} from '../../common/errors';
import { SchemaBuilder } from '../../common/schemes';
import { RemoveOptions } from '../../common/types';
import { ConfigLoader } from '../../common/utils';
import { CliCommand } from './CliCommand';

export class RemoveCommand extends CliCommand<RemoveOptions> {
  private __name: string;

  constructor(
    name: string,
    options: RemoveOptions,
    configLoader: ConfigLoader,
    schemaBuilder: SchemaBuilder,
    files: string[]
  ) {
    super(
      options,
      configLoader,
      schemaBuilder,
      files,
      !options.path,
      new MissingParamsException('--path <path>')
    );
    this.__name = name;
  }

  // * ------------------------------
  // * PUBLIC MEMBERS
  // * ------------------------------
  public run(callback: (path: string) => void): void {
    const path = this._options.path || this._config?.rootDir;
    const test = this._options.test || this._config?.test;

    if (path) {
      const folder = join(path, this.__name);
      if (existsSync(folder) && lstatSync(folder).isDirectory()) {
        this.__remove(folder, test, callback);
      } else {
        throw new FileNotFoundException(`${folder} is not a directory!`);
      }
    } else {
      throw new MissingParamsException('--path <path>');
    }
  }
  // * ------------------------------
  // * END OF PUBLIC MEMBERS
  // * ------------------------------

  // * ------------------------------
  // * PRIVATE MEMBERS
  // * ------------------------------
  private __remove(
    folder: string,
    test: boolean | undefined,
    callback: (path: string) => void
  ): void {
    if (test) {
      this.__removeFile(folder, callback);
    } else {
      this.__removeDir(folder, callback);
    }
  }

  private __removeFile(folder: string, callback: (path: string) => void): void {
    const filename = this.__name + '.test';
    const files = readdirSync(folder);
    const testFile = files.filter(file => file.includes(filename)).join('');
    const filePath = join(folder, testFile);

    if (lstatSync(filePath).isFile()) {
      rm(filePath, () => callback(filePath));
    } else {
      const dotIndex = files[0].lastIndexOf('.');
      const extension = files[0].substring(dotIndex);

      throw new FileNotFoundException(
        `Couldn't find ${join(folder, filename + extension)}`
      );
    }
  }

  private __removeDir(folder: string, callback: (path: string) => void): void {
    rm(folder, { recursive: true }, () => callback(folder));
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------
}
