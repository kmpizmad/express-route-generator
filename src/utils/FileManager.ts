import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
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

  public static readSchema(schemesDir: string, filename: string): string {
    if (existsSync(schemesDir) && lstatSync(schemesDir).isDirectory()) {
      const schemes = readdirSync(schemesDir);
      const path = join(
        schemesDir,
        schemes.filter(file => file.includes(filename)).join('')
      );

      if (existsSync(path) && lstatSync(path).isFile()) {
        return readFileSync(path, { encoding: 'utf-8' });
      } else {
        throw new FileNotFoundException(
          `'${filename}' schema is missing in '${schemesDir}'.`
        );
      }
    } else {
      throw new FileNotFoundException(`'${schemesDir}' is missing.`);
    }
  }
}
