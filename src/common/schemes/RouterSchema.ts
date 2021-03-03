import { Schema } from './Schema';
import { SchemaBuilder } from './SchemaBuilder';

export class RouterSchema extends Schema {
  constructor(methods: string[], schemaBuilder: SchemaBuilder) {
    const [router] = schemaBuilder.build('index', methods);
    super('index', router);
  }
}
