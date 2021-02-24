import { Schema } from './Schema';
import { SchemaBuilder } from './SchemaBuilder';

export class HandlerSchema extends Schema {
  constructor(filename: string, methods: string[]) {
    const schemaBuilder = new SchemaBuilder(filename, methods);
    super(filename + '.handlers', schemaBuilder.build('handlers'));
  }
}
