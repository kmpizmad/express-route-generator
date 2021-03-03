import { Schema } from './Schema';
import { SchemaBuilder } from './SchemaBuilder';

export class HandlerSchema extends Schema {
  constructor(
    filename: string,
    methods: string[],
    schemaBuilder: SchemaBuilder
  ) {
    const [, handlers] = schemaBuilder.build(filename, methods);
    super(filename + '.handlers', handlers);
  }
}
