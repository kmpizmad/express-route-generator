import { existsSync, mkdirSync, writeFile } from 'fs';
import { join } from 'path';

export class Schema {
  protected _name: string;
  protected _schema: string;

  constructor(name: string, schema: string) {
    this._name = name;
    this._schema = schema;
  }

  get name(): string {
    return this._name;
  }

  public async build(
    path: string,
    extension: string,
    callback: (path: string) => void
  ): Promise<void> {
    const file = join(path, this._name) + extension;

    if (!existsSync(path)) {
      mkdirSync(path, { recursive: true });
    }
    writeFile(file, this._schema, () => callback(file));
  }
}
