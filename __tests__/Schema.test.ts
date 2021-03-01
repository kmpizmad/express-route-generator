import { execSync } from 'child_process';
import {
  HandlerSchema,
  RouterSchema,
  Schema,
  TestSchema,
} from '../src/common/schemes';

afterEach(() => execSync('rm -rf somePath'));

describe('Schema class', () => {
  const filename = 'testRouter';
  const path = 'somePath';
  const ext = '.js';
  const methods = ['get'];

  it('builds file', () => {
    const schema = new Schema(filename, '// Index');
    expect(() => schema.build(path, ext)).not.toThrow();
  });

  it('RouterSchema builds', () => {
    const routerSchema = new RouterSchema(filename, methods);
    expect(() => routerSchema.build(path, ext)).not.toThrow();
  });

  it('HandlerSchema builds', () => {
    const handlerSchema = new HandlerSchema(filename, methods);
    expect(() => handlerSchema.build(path, ext)).not.toThrow();
  });

  it('TestSchema builds', () => {
    const testSchema = new TestSchema(filename, methods, true);
    expect(() => testSchema.build(path, ext)).not.toThrow();
  });
});
