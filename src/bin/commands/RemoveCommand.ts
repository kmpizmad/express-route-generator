import { red } from 'chalk';
import { existsSync, lstatSync, readdirSync, rm } from 'fs';
import { join } from 'path';
import {
  FileNotFoundException,
  MissingParamsException,
} from '../../common/errors';
import { RemoveOptions } from '../../common/types';
import { Chalk } from '../../common/vendors/chalk';
import { CliCommand } from './CliCommand';

export class RemoveCommand extends CliCommand<RemoveOptions> {
  constructor(public name: string, options: RemoveOptions) {
    super(options, !options.path, new MissingParamsException('--path <path>'));
  }

  // * ------------------------------
  // * PUBLIC MEMBERS
  // * ------------------------------
  public run(): void {
    const path = this.options.path || this._config?.rootDir;
    const test = this.options.test || this._config?.test;

    if (path) {
      const folder = join(path, this.name);
      if (existsSync(folder) && lstatSync(folder).isDirectory()) {
        this.__remove(folder, test);
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
  private __remove(folder: string, test?: boolean): void {
    if (test) {
      this.__removeFile(folder);
    } else {
      this.__removeDir(folder);
    }
  }

  private __removeFile(folder: string): void {
    const filename = this.name + '.test';
    const files = readdirSync(folder);
    const testFile = files.filter(file => file.includes(filename)).join('');
    const filePath = join(folder, testFile);

    if (lstatSync(filePath).isFile()) {
      rm(filePath, Chalk.log(red, `deleted ${filePath}`));
    } else {
      const dotIndex = files[0].lastIndexOf('.');
      const extension = files[0].substring(dotIndex);

      throw new FileNotFoundException(
        `Couldn't find ${join(folder, filename + extension)}`
      );
    }
  }

  private __removeDir(folder: string): void {
    rm(folder, { recursive: true }, Chalk.log(red, `deleted ${folder}`));
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------
}
