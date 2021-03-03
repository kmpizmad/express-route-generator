import {
  Schema,
  HandlerSchema,
  SchemaBuilder,
} from '../../../src/common/schemes';
import { FileManager } from '../../../src/common/utils';

jest.mock('../../../src/common/schemes/Schema');

describe('HandlerSchema', () => {
  const schema = new HandlerSchema(
    'sample',
    ['get'],
    new SchemaBuilder(new FileManager())
  );
  const path = 'root';
  const ext = '.js';

  it('Instantiates', () => {
    expect(schema).toBeDefined();
    expect(HandlerSchema).toBeCalledTimes(1);
    expect(Schema).toBeCalledTimes(1);
  });

  it('Builds', () => {
    expect(schema.build(path, ext, jest.fn)).toBeUndefined();
    expect(schema.build).toBeCalledTimes(1);
  });
});
