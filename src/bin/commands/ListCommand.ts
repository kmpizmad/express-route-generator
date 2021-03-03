import { white, yellow } from 'chalk';
import { existsSync, lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import {
  DirectoryNotFoundException,
  FileNotFoundException,
  MissingParamsException,
} from '../../common/errors';
import { SchemaBuilder } from '../../common/schemes';
import { ListOptions } from '../../common/types';
import { ConfigLoader } from '../../common/utils';
import { CliCommand } from './CliCommand';

export class ListCommand extends CliCommand<ListOptions> {
  constructor(
    options: ListOptions,
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
  }

  // * ------------------------------
  // * PUBLIC MEMBERS
  // * ------------------------------
  public run(): void {
    const path = this._options.path || this._config?.rootDir;
    const recursive = this._options.recursive;

    if (path) {
      this.__list(path, recursive);
    }
  }
  // * ------------------------------
  // * END OF PUBLIC MEMBERS
  // * ------------------------------

  // * ------------------------------
  // * PRIVATE MEMBERS
  // * ------------------------------
  private __list(path: string, recursive: boolean): void {
    if (recursive) {
      this.__recursiveListing(path, 0, (file, ind, isDir) => {
        if (ind === 0) return;
        else {
          const color = isDir ? yellow : white;
          console.log(color(this.__createMsg(file, ind)));
        }
      });
    } else {
      this.__listHandler(path, files => console.log(yellow(files.join('  '))));
    }
  }

  private __listHandler(path: string, callback: (files: string[]) => void) {
    if (existsSync(path) && lstatSync(path).isDirectory()) {
      callback(readdirSync(path));
    } else {
      throw new DirectoryNotFoundException(
        `Couldn't find directory '${path}'.`
      );
    }
  }

  private __recursiveListing(
    path: string,
    indentation: number,
    callback: (filename: string, indentation: number, isDir?: boolean) => void
  ) {
    if (existsSync(path)) {
      if (lstatSync(path).isDirectory()) {
        callback(path, indentation, true);
        readdirSync(path).forEach(file =>
          this.__recursiveListing(join(path, file), indentation + 1, callback)
        );
      } else {
        callback(path, indentation, false);
      }
    } else {
      throw new FileNotFoundException(`Couldn't find '${path}'.`);
    }
  }

  private __createMsg(filename: string, indentation: number) {
    let ind = '';

    for (let i = 0; i < indentation / 2; i++) {
      ind += ' ';
    }

    const msg = (filename: string): string => {
      // eslint-disable-next-line no-useless-escape
      const file = filename.split(/[\\|\/]/).pop() as string;
      return lstatSync(filename).isDirectory() ? file : ind + '└ ' + file;
    };

    return msg(filename);
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------
}
