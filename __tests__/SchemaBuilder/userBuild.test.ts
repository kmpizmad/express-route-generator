import { execSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { SchemaBuilder } from '../../src/common/schemes';

const name = 'mySchemes';
const config = {
  extension: '.js',
  filename: 'testRoute',
  path: 'routes',
  schemesDir: name,
};

function setupTest() {
  mkdirSync(name);
  writeFileSync(join(name, 'index'), '// Index');
  writeFileSync(join(name, '.handlers'), '// Handlers');
  writeFileSync(join(name, '.test'), '// Test');
}

afterEach(() => execSync(`rm -rf ${name} ${config.path}`));

describe('SchemaBuilder.userBuild(): void', () => {
  it('builds properly', async done => {
    setupTest();
    expect(() => SchemaBuilder.userBuild(config)).not.toThrow();
    done();
  });

  it('throws error', async done => {
    expect(() => SchemaBuilder.userBuild(config)).toThrow();
    done();
  });
});
