import { execSync } from 'child_process';
import { SchemaBuilder } from '../../src/schemes';

describe('default builds', () => {
  it('generates files', async done => {
    expect(() => {
      SchemaBuilder.defaultBuild(
        {
          extension: '.js',
          filename: 'testRoute',
          path: 'routes',
          methods: ['get', 'post'],
          test: false,
        },
        true
      );
    }).not.toThrow();

    execSync('rm -rf routes');

    done();
  });
});
