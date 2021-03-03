import { Schema, SchemaBuilder, TestSchema } from '../../../src/common/schemes';
import { FileManager } from '../../../src/common/utils';

jest.mock('../../../src/common/schemes/Schema');

describe('TestSchema', () => {
  const schema = new TestSchema(
    'sample',
    ['get'],
    new SchemaBuilder(new FileManager()),
    true
  );
  const schemaWithoutTest = new TestSchema(
    'sample',
    ['get'],
    new SchemaBuilder(new FileManager()),
    false
  );
  const path = 'root';
  const ext = '.js';

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('Instantiates', () => {
    expect(
      new TestSchema(
        'sample',
        ['get'],
        new SchemaBuilder(new FileManager()),
        true
      )
    ).toBeDefined();
    expect(TestSchema).toBeCalledTimes(1);
    expect(Schema).toBeCalledTimes(1);
  });

  it('Builds', () => {
    schema.build(path, ext, jest.fn).then(res => expect(res).toBeUndefined());
    expect(schema.build).toBeCalledTimes(1);
  });

  it('Skips test file if the condition hasn\'t been fulfilled', () => {
    schemaWithoutTest
      .build(path, ext, jest.fn)
      .then(res => expect(res).toBeUndefined());
    expect(schemaWithoutTest.build).toBeCalledTimes(1);
  });
});
