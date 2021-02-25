import { execSync } from 'child_process';
import { Schema, TestSchema } from '../src/schemes';

describe('Schema class', () => {
  it('builds router', async done => {
    const schema = new Schema('testRouter', '// Index');

    expect(() => {
      schema.build('somePath', '.js', true);
    }).not.toThrow();

    done();
  });
  it('builds test schema', async done => {
    const testSchema = new TestSchema('testRouter', ['get', 'post'], true);

    expect(() => {
      testSchema.build('somePath', '.js', true);
    }).not.toThrow();

    execSync('rm -rf somePath');

    done();
  });
});
