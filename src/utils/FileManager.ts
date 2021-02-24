import { readFileSync } from 'fs';
import { join } from 'path';

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
    return readFileSync(
      join(
        schemesDir,
        schemes.filter(file => file.includes(filename)).join('')
      ),
      { encoding: 'utf-8' }
    );
  }
}
