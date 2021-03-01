import { Schema } from './Schema';
import { SchemaBuilder } from './SchemaBuilder';

export class RouterSchema extends Schema {
  constructor(filename: string, methods: string[]) {
    const schemaBuilder = new SchemaBuilder(filename, methods);
    super('index', schemaBuilder.build('router'));
  }
}
