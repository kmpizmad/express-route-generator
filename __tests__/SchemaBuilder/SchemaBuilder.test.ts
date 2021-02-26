import { SchemaBuilder } from '../../src/schemes';

const routerSchema = `import { Router } from "express";
import { getController } from "./test-file.handlers";

const router = Router();

router.route('/').get(getController);

export default router;`;

const handlerSchema = `export const getController = async (req, res, next) => {};`;

const testSchema = `import supertest from "supertest";

describe('test-file test', () => {
  it('get', async done => {
    const response = await supertest(server).get('/test-file');

    // expectations

    done();
  });
});`;

describe('SchemaBuilder class', () => {
  const filename = 'test-file';
  const methods = ['get'];
  const schemaBuilder = new SchemaBuilder(filename, methods);

  it('builds router', () => {
    const buildNames = ['index', 'route', 'router', 'endpoint'];
    buildNames.forEach(name =>
      expect(schemaBuilder.build(name)).toBe(routerSchema)
    );
  });

  it('builds .handlers', () => {
    const buildNames = [
      'handler',
      'handlers',
      'operation',
      'operations',
      'method',
      'methods',
    ];
    buildNames.forEach(name =>
      expect(schemaBuilder.build(name)).toBe(handlerSchema)
    );
  });

  it('builds .test', () => {
    const buildNames = ['test', 'tests', 'spec', 'specs'];
    buildNames.forEach(name =>
      expect(schemaBuilder.build(name)).toBe(testSchema)
    );
  });

  it('throws exception', () => {
    expect(() => schemaBuilder.build('someBuild')).toThrow();
  });
});
