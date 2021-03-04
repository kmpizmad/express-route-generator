import { Schema } from './Schema';
import { SchemaBuilder } from './SchemaBuilder';

export class RouterSchema extends Schema {
  constructor(
    filename: string,
    methods: string[],
    schemaBuilder: SchemaBuilder
  ) {
    const [router] = schemaBuilder.buildSchema(filename, methods);
    super('index', router);
  }
}
