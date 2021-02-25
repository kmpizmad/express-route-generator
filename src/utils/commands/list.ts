import { yellow } from 'chalk';
import { readdir } from 'fs';
import { Exception, MissingParamsException } from '../../errors';
import { List } from '../../types';
import { Chalk } from '../../vendors/chalk';
import { setupCommand } from './setupCommand';

export function list(options: List) {
  const config = setupCommand(
    !options.path,
    new MissingParamsException('--path <path>')
  );

  const path = options.path || config?.rootDir;
  //   const recursive = options.recursive;

  if (path) {
    readdir(path, (err, files) => {
      if (err) {
        throw new Exception(err.message);
      }

      Chalk.writeLine(yellow, files.join('  '));
    });
  }
}
