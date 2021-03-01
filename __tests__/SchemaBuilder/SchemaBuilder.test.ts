import { SchemaBuilder } from '../../src/common/schemes';

const routerSchema =
  'import { Router } from "express";\nimport { getHandler, getOneHandler } from "./test-file.handlers";\n\nconst router = Router();\nrouter.route("/").get(getHandler);\nrouter.route("/:id").get(getOneHandler);\n\nexport default router;';

const handlerSchema =
  'export const getHandler = async (req, res, next) => {};\nexport const getOneHandler = async (req, res, next) => {};';

const testSchema =
  'import supertest from "supertest";\n\ndescribe("test-file test", () => {\n\tit("get", async done => {\n\t\tconst response = await supertest(server).get("/test-file");\n\t\t// Expectations\n\t\tdone();\n\t});\n\tit("getOne", async done => {\n\t\tconst response = await supertest(server).get("/test-file");\n\t\t// Expectations\n\t\tdone();\n\t});\n});';

describe('SchemaBuilder class', () => {
  const filename = 'test-file';
  const methods = ['get', 'getOne'];
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
