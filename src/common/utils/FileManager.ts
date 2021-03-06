import { existsSync, lstatSync, readdirSync, readFileSync } from 'fs';
import { join } from 'path';
import { DirectoryNotFoundException, FileNotFoundException } from '../errors';

export class FileManager {
  public setExtensions(filename: string, extensions: string[]): string[] {
    return extensions.map(extension => filename + extension);
  }

  public readSchema(schemesDir: string, filename: string): string {
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
      throw new DirectoryNotFoundException(`'${schemesDir}' is missing.`);
    }
  }
}
