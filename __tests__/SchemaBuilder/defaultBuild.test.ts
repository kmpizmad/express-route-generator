import { execSync } from 'child_process';
import { SchemaBuilder } from '../../src/common/schemes';

const config = {
  extension: '.js',
  filename: 'testRoute',
  path: 'routes',
  methods: ['get', 'post'],
  test: false,
};

afterAll(() => execSync(`rm -rf ${config.path}`));

describe('SchemaBuilder.defaultBuild(): void', () => {
  it('builds properly', () => {
    expect(() => SchemaBuilder.defaultBuild(config)).not.toThrow();
  });
});
