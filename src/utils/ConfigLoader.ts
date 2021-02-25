import { existsSync, lstatSync } from 'fs';
import { join } from 'path';
import { Exception, FileNotFoundException } from '../errors';
import { Config } from '../types';

export class ConfigLoader {
  /**
   * Load the first file that exists or throws an error
   * @param files files to search from first to last
   */
  public static load(files: string[], exception?: Exception): Config {
    for (let i = 0; i < files.length; i++) {
      const file = join(process.cwd(), files[i]);

      if (existsSync(file) && lstatSync(file).isFile()) {
        const config = require(file);
        return config;
      }
    }

    const ex =
      exception ||
      new FileNotFoundException(
        `Couldn't find any of these files: ${files.toString()}`
      );
    throw ex;
  }
}
