import {
  Schema,
  RouterSchema,
  SchemaBuilder,
} from '../../../src/common/schemes';
import { FileManager } from '../../../src/common/utils';

jest.mock('../../../src/common/schemes/Schema');

describe('RouterSchema', () => {
  const schema = new RouterSchema(
    'sample',
    ['get'],
    new SchemaBuilder(new FileManager())
  );
  const path = 'root';
  const ext = '.js';

  it('Instantiates', () => {
    expect(schema).toBeDefined();
    expect(RouterSchema).toBeCalledTimes(1);
    expect(Schema).toBeCalledTimes(1);
  });

  it('Builds', () => {
    expect(schema.build(path, ext, jest.fn)).toBeUndefined();
    expect(schema.build).toBeCalledTimes(1);
  });
});
