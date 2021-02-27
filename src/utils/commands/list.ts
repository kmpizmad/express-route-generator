import { yellow, white } from 'chalk';
import { existsSync, lstatSync, readdirSync } from 'fs';
import { join } from 'path';
import {
  DirectoryNotFoundException,
  FileNotFoundException,
  MissingParamsException,
} from '../../errors';
import { ListOptions } from '../../types';
import { Chalk } from '../../vendors/chalk';
import { setupCommand } from './setupCommand';

export function list(options: ListOptions) {
  const config = setupCommand(
    !options.path,
    new MissingParamsException('--path <path>')
  );

  const path = options.path || config?.rootDir;
  const recursive = options.recursive;

  if (path) {
    if (recursive) {
      recursiveListing(path, 0, (file, ind, isDir) => {
        if (ind === 0) return;
        else Chalk.writeLine(isDir ? yellow : white, createMsg(file, ind));
      });
    } else {
      listHandler(path, files => Chalk.writeLine(yellow, files.join('  ')));
    }
  }
}

/**
 * List like 'ls'
 * @param path
 * @param callback
 */
function listHandler(path: string, callback: (files: string[]) => void) {
  if (existsSync(path) && lstatSync(path).isDirectory()) {
    callback(readdirSync(path));
  } else {
    throw new DirectoryNotFoundException(`Couldn't find directory '${path}'.`);
  }
}

/**
 * Recursively lists all files within all route folders
 * @param path Folder that contains every route
 * @param indentation The current indentation level (first call should be 0)
 * @param callback Callback function for the current file
 */
function recursiveListing(
  path: string,
  indentation: number,
  callback: (filename: string, indentation: number, isDir?: boolean) => void
) {
  if (existsSync(path)) {
    if (lstatSync(path).isDirectory()) {
      callback(path, indentation, true);
      readdirSync(path).forEach(file =>
        recursiveListing(join(path, file), indentation + 1, callback)
      );
    } else {
      callback(path, indentation, false);
    }
  } else {
    throw new FileNotFoundException(`Couldn't find '${path}'.`);
  }
}

/**
 * Creates a message for the current level of indentation
 * @param filename Current file
 * @param indentation Current indentation
 */
function createMsg(filename: string, indentation: number) {
  let ind = '';

  for (let i = 0; i < indentation / 2; i++) {
    ind += ' ';
  }

  const msg = (filename: string): string => {
    const file = filename.split(/[\\|\/]/).pop() as string;
    return lstatSync(filename).isDirectory() ? file : ind + '└ ' + file;
  };

  return msg(filename);
}
