import { red } from 'chalk';
import { existsSync, lstatSync, readdirSync, rm } from 'fs';
import { join } from 'path';
import { FileNotFoundException, MissingParamsException } from '../../errors';
import { RemoveOptions } from '../../types';
import { Chalk } from '../../vendors/chalk';
import { setupCommand } from './setupCommand';

export function remove(name: string, options: RemoveOptions) {
  const config = setupCommand(
    !options.path,
    new MissingParamsException('--path <path>')
  );

  const path = options.path || config?.rootDir;
  const test = options.test || config?.test;

  if (path) {
    const folder = join(path, name);

    if (existsSync(folder) && lstatSync(folder).isDirectory()) {
      if (test) {
        const filename = name + '.test';
        const files = readdirSync(folder);
        const testFile = files.filter(file => file.includes(filename)).join('');
        const filePath = join(path, name, testFile);
        rm(filePath, removeHandler(filePath));
      } else {
        rm(folder, { recursive: true }, removeHandler(folder));
      }
    } else {
      throw new FileNotFoundException(`${folder} is not a directory!`);
    }
  } else {
    throw new MissingParamsException('--path <path>');
  }
}

function removeHandler(fileOrFolder: string) {
  return () => Chalk.writeLine(red, `removed ${fileOrFolder}`);
}
