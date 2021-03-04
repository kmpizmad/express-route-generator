import { execSync } from 'child_process';
import { existsSync, lstatSync, readdirSync, readFile } from 'fs';
import { join } from 'path';
import { InvalidArgumentException } from '../../../src/common/errors';
import {
  HandlerSchema,
  RouterSchema,
  Schema,
  SchemaBuilder,
  TestSchema,
} from '../../../src/common/schemes';
import { FileManager } from '../../../src/common/utils';

const routerSchema =
  'import { Router } from "express";\nimport { getHandler, getOneHandler } from "./sample.handlers";\n\nconst router = Router();\nrouter.route("/").get(getHandler);\nrouter.route("/:id").get(getOneHandler);\n\nexport default router;';
const handlerSchema =
  'export const getHandler = async (req, res, next) => {};\nexport const getOneHandler = async (req, res, next) => {};';
const testSchema =
  'import supertest from "supertest";\n\ndescribe("sample test", () => {\n\tit("get", async done => {\n\t\tconst response = await supertest(server).get("/sample");\n\t\t// Expectations\n\t\tdone();\n\t});\n\tit("getOne", async done => {\n\t\tconst response = await supertest(server).get("/sample");\n\t\t// Expectations\n\t\tdone();\n\t});\n});';

describe('SchemaBuilder', () => {
  const schemaBuilder = new SchemaBuilder(new FileManager());
  const path = 'root';
  const ext = '.js';
  const name = 'sample';
  const methods = ['get', 'getOne'];

  const builtInSchemes = [routerSchema, handlerSchema, testSchema];
  const customSchemes = [
    '// Custom router schema',
    '// Custom handler schema',
    '// Custom test schema',
  ];

  afterEach(() => execSync('rm -rf root'));

  it('Generates valid strings', () => {
    const [router, handlers, tests] = schemaBuilder.buildSchema(name, methods);

    expect(router).toBeTruthy();
    expect(handlers).toBeTruthy();
    expect(tests).toBeTruthy();
  });

  it('Generates strings correctly', () => {
    const [router, handlers, tests] = schemaBuilder.buildSchema(name, methods);

    expect(router).toBe(routerSchema);
    expect(handlers).toBe(handlerSchema);
    expect(tests).toBe(testSchema);
  });

  it('Generate files with built-in schemes', async done => {
    const sb = new SchemaBuilder(new FileManager());
    await schemaBuilder.build(
      [
        new RouterSchema(name, methods, sb),
        new HandlerSchema(name, methods, sb),
        new TestSchema(name, methods, sb, true),
      ],
      { path, extension: ext },
      jest.fn
    );

    const files = readdirSync(path);

    files.forEach((file, i) => {
      const fullPath = join(path, file);

      expect(existsSync(fullPath)).toBeTruthy();
      expect(lstatSync(fullPath).isFile()).toBeTruthy();

      readFile(fullPath, { encoding: 'utf-8' }, (_, data) =>
        expect(data).toBe(builtInSchemes[i])
      );
    });

    done();
  });

  it('Generate files with custom schemes', async done => {
    await schemaBuilder.build(
      [
        new Schema('index', '// Custom router schema'),
        new Schema(name + '.handlers', '// Custom handler schema'),
        new Schema(name + '.test', '// Custom test schema'),
      ],
      { path, extension: ext },
      jest.fn
    );

    const files = readdirSync(path);

    files.forEach((file, i) => {
      const fullPath = join(path, file);

      expect(existsSync(fullPath)).toBeTruthy();
      expect(lstatSync(fullPath).isFile()).toBeTruthy();

      readFile(fullPath, { encoding: 'utf-8' }, (_, data) =>
        expect(data).toBe(customSchemes[i])
      );
    });

    done();
  });

  it('Throws InvalidArgumentsException if \'methods\' has a length of 0', () => {
    expect(() => schemaBuilder.buildSchema('test', [])).toThrow();
    expect(() => schemaBuilder.buildSchema('test', [])).toThrowError(
      new InvalidArgumentException(
        'Expected \'methods\' to have at least 1 item, recieved 0.'
      ) as Error
    );
  });
});
