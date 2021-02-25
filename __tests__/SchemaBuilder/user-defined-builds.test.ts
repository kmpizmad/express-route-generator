import { execSync } from 'child_process';
import { mkdirSync, writeFileSync } from 'fs';
import { join } from 'path';
import { FileNotFoundException } from '../../src/errors';
import { SchemaBuilder } from '../../src/schemes';

describe('user defined builds', () => {
  it('generates files', async done => {
    const mySchemes = 'mySchemes';
    mkdirSync(mySchemes);
    writeFileSync(join(mySchemes, 'index'), '// Index');
    writeFileSync(join(mySchemes, '.handlers'), '// Handlers');
    writeFileSync(join(mySchemes, '.test'), '// Test');

    expect(() => {
      SchemaBuilder.userBuild(
        {
          extension: '.js',
          filename: 'testRoute',
          path: 'routes',
          schemesDir: 'mySchemes',
        },
        true
      );
    }).not.toThrow();

    execSync('rm -rf routes mySchemes');

    done();
  });
  it('throws error if schemesDir is missing', async done => {
    expect(() => {
      SchemaBuilder.userBuild(
        {
          extension: '.js',
          filename: 'testRoute',
          path: 'routes',
          schemesDir: 'mySchemes',
        },
        true
      );
    }).toThrowError(
      new FileNotFoundException("'mySchemes' is missing.") as Error
    );

    done();
  });
});
