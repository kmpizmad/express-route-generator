import { Schema } from './Schema';
import { SchemaBuilder } from './SchemaBuilder';

export class TestSchema extends Schema {
  private __condition: boolean;

  constructor(filename: string, methods: string[], condition: boolean) {
    const schemaBuilder = new SchemaBuilder(filename, methods);
    super(filename + '.test', schemaBuilder.build('tests'));

    this.__condition = condition;
  }

  public build(path: string, extension: string): void {
    if (this.__condition) {
      super.build(path, extension);
    } else {
      return;
    }
  }
}
