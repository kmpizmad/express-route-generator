import { green } from 'chalk';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join } from 'path';
import { Chalk } from '../vendors/chalk';

export class Schema {
  protected _name: string;
  protected _schema: string;

  constructor(name: string, schema: string) {
    this._name = name;
    this._schema = schema;
  }

  public build(path: string, extension: string, testing?: boolean): void {
    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }

    const file = join(path, this._name) + extension;
    writeFile(file, this._schema, () => {
      if (!testing) Chalk.writeLine(green, `created ${file}`);
    });
  }
}
