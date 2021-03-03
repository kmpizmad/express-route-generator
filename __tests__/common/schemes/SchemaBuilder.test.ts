import { InvalidArgumentException } from '../../../src/common/errors';
import { SchemaBuilder } from '../../../src/common/schemes';
import { FileManager } from '../../../src/common/utils';

const routerSchema =
  'import { Router } from "express";\nimport { getHandler, getOneHandler } from "./test.handlers";\n\nconst router = Router();\nrouter.route("/").get(getHandler);\nrouter.route("/:id").get(getOneHandler);\n\nexport default router;';
const handlerSchema =
  'export const getHandler = async (req, res, next) => {};\nexport const getOneHandler = async (req, res, next) => {};';
const testSchema =
  'import supertest from "supertest";\n\ndescribe("test test", () => {\n\tit("get", async done => {\n\t\tconst response = await supertest(server).get("/test");\n\t\t// Expectations\n\t\tdone();\n\t});\n\tit("getOne", async done => {\n\t\tconst response = await supertest(server).get("/test");\n\t\t// Expectations\n\t\tdone();\n\t});\n});';

describe('SchemaBuilder', () => {
  const schemaBuilder = new SchemaBuilder(new FileManager());

  it('Generates valid strings', () => {
    const [router, handlers, tests] = schemaBuilder.build('test', [
      'get',
      'getOne',
    ]);

    expect(router).toBeTruthy();
    expect(handlers).toBeTruthy();
    expect(tests).toBeTruthy();
  });

  it('Generates strings correctly', () => {
    const [router, handlers, tests] = schemaBuilder.build('test', [
      'get',
      'getOne',
    ]);

    expect(router).toBe(routerSchema);
    expect(handlers).toBe(handlerSchema);
    expect(tests).toBe(testSchema);
  });

  it('Throws InvalidArgumentsException if \'methods\' has a length of 0', () => {
    expect(() => schemaBuilder.build('test', [])).toThrow();
    expect(() => schemaBuilder.build('test', [])).toThrowError(
      new InvalidArgumentException(
        'Expected \'methods\' to have at least 1 item, recieved 0.'
      ) as Error
    );
  });
});
