import { lstatSync, readFileSync } from 'fs';
import { join } from 'path';
import { FileNotFoundException } from '../errors';

export class FileManager {
  private constructor() {}

  public static setExtensions(
    filename: string,
    extensions: string[]
  ): string[] {
    return extensions.map(extension => filename + extension);
  }

  public static readSchema(
    schemesDir: string,
    schemes: string[],
    filename: string
  ): string {
    const path = join(
      schemesDir,
      schemes.filter(file => file.includes(filename)).join('')
    );

    if (lstatSync(path).isFile()) {
      return readFileSync(path, { encoding: 'utf-8' });
    } else {
      const ex = new FileNotFoundException(
        `'${filename}' schema is missing in '${schemesDir}'`
      );
      return ex.throw();
    }
  }
}
