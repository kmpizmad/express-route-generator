import { green } from 'chalk';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join } from 'path';
import { FileNotFoundException } from '../errors';

export class Schema {
  protected _name: string;
  protected _schema: string;

  constructor(name: string, schema: string) {
    this._name = name;
    this._schema = schema;
  }

  public build(path: string, extension: string): void {
    try {
      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }

      const file = join(path, this._name) + extension;
      writeFile(file, this._schema, () => console.log(green('created', file)));
    } catch (error) {
      const exception = new FileNotFoundException(error.message);
      exception.throw();
    }
  }
}
