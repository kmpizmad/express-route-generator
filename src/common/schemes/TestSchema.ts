import { Schema } from './Schema';
import { SchemaBuilder } from './SchemaBuilder';

export class TestSchema extends Schema {
  private __condition: boolean;

  constructor(
    filename: string,
    methods: string[],
    schemaBuilder: SchemaBuilder,
    condition: boolean
  ) {
    const [, , tests] = schemaBuilder.build(filename, methods);
    super(filename + '.test', tests);
    this.__condition = condition;
  }

  public async build(
    path: string,
    extension: string,
    callback: (path: string) => void
  ): Promise<void> {
    if (!this.__condition) {
      return;
    }
    super.build(path, extension, callback);
  }
}
