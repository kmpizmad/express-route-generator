import { existsSync, lstatSync } from 'fs';
import { join } from 'path';
import { Exception, FileNotFoundException } from '../errors';
import { ConfigFile } from '../types';

export class ConfigLoader {
  /**
   * Load the first file that exists or throws an error
   * @param files files to search from first to last
   */
  public static load(files: string[], exception?: Exception): ConfigFile {
    const file = files.filter(
      file => existsSync(file) && lstatSync(file).isFile()
    )[0];

    if (!!file) {
      return require(join(process.cwd(), file));
    } else {
      const ex =
        exception ||
        new FileNotFoundException(
          `Couldn't find any of these files: ${files.toString()}`
        );
      throw ex;
    }
  }
}
