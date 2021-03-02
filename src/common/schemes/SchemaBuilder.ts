import { join } from 'path';
import { HandlerSchema, RouterSchema, Schema, TestSchema } from '.';
import { InvalidArgumentException } from '../errors';
import { DefaultOptions, UserOptions } from '../types';
import { ArrayFormatter } from '../utils/ArrayFormatter';
import { FileManager } from '../utils/FileManager';

export class SchemaBuilder {
  private __name: string;
  private __methods: string[];
  private __normalMethods: string[];
  private __paramMethods: string[];

  constructor(name: string, methods: string[]) {
    this.__name = name;
    this.__methods = methods;
    this.__divideMethods(methods);
  }

  // * ------------------------------
  // * PUBLIC MEMBERS
  // * ------------------------------
  public build(name: string): string {
    switch (name) {
    case 'index':
    case 'route':
    case 'router':
    case 'endpoint':
      return this.__buildRouter();

    case 'handler':
    case 'handlers':
    case 'operation':
    case 'operations':
    case 'method':
    case 'methods':
      return this.__buildHandlers();

    case 'test':
    case 'tests':
    case 'spec':
    case 'specs':
      return this.__buildTests();

    default:
      throw new InvalidArgumentException(
        `Couldn't recognize build pattern '${name}'`
      );
    }
  }

  public static userBuild(options: UserOptions): void {
    const { path, filename, extension, schemesDir } = options;
    const routerSchema = FileManager.readSchema(schemesDir, 'index');
    const handlerSchema = FileManager.readSchema(schemesDir, '.handlers');
    const testSchema = FileManager.readSchema(schemesDir, '.test');

    const router = new Schema('index', routerSchema);
    const handlers = new Schema(filename + '.handlers', handlerSchema);
    const test = new Schema(filename + '.test', testSchema);

    [router, handlers, test].forEach(schema => {
      const folder = join(path, filename);
      schema.build(folder, extension);
    });
  }

  public static defaultBuild(options: DefaultOptions): void {
    const { path, filename, extension, methods, test } = options;
    const routerSchema = new RouterSchema(filename, methods);
    const handlerSchema = new HandlerSchema(filename, methods);
    const testSchema = new TestSchema(filename, methods, test);

    const schemes = [routerSchema, handlerSchema, testSchema];

    schemes.forEach(schema => {
      const folder = join(path, filename);
      schema.build(folder, extension);
    });
  }
  // * ------------------------------
  // * END OF PUBLIC MEMBERS
  // * ------------------------------

  // * ------------------------------
  // * PRIVATE MEMBERS
  // * ------------------------------
  private __buildRouter(): string {
    const allControllers: string = this.__methods
      .map(method => method + 'Handler')
      .join(', ');
    const normalControllers: string = this.__buildOperations(
      this.__normalMethods
    ).join('.');
    const paramControllers: string = this.__buildOperations(
      this.__paramMethods
    ).join('.');

    const imports: string =
      'import { Router } from "express";\nimport { ' +
      allControllers +
      ' } from "./' +
      this.__name +
      '.handlers";\n\n';

    const routerInstance = 'const router = Router();\n';
    const normalRouter: string = normalControllers
      ? 'router.route("/").' + normalControllers + ';\n'
      : '';
    const paramRouter = paramControllers
      ? 'router.route("/:id").' + paramControllers + ';\n'
      : '';
    const router: string = routerInstance + normalRouter + paramRouter;

    const exports = '\nexport default router;';

    return imports + router + exports;
  }

  private __buildHandlers(): string {
    return this.__methods
      .map(
        method =>
          `export const ${method}Handler = async (req, res, next) => {};`
      )
      .join('\n');
  }

  private __buildTests(): string {
    const imports = 'import supertest from "supertest";\n\n';
    const tests: string = this.__methods
      .map(
        method =>
          `it("${method}", async done => {\n\t\tconst response = await supertest(server).${this.__normalizeMethod(
            method
          )}("/${this.__name}");\n\t\t// Expectations\n\t\tdone();\n\t});`
      )
      .join('\n\t');

    const describe = `describe("${this.__name} test", () => {\n\t${tests}\n});`;

    return imports + describe;
  }

  private __buildOperations(methods: string[]): string[] {
    return methods.map(
      method => `${this.__normalizeMethod(method)}(${method}Handler)`
    );
  }

  private __normalizeMethod(method: string): string {
    return method.toLowerCase().includes('one')
      ? method.substring(0, method.length - 3)
      : method;
  }

  private __divideMethods(methods: string[]) {
    const [normal, param] = ArrayFormatter.divide(methods, this.__addMethod);
    this.__normalMethods = normal;
    this.__paramMethods = param;
  }

  private __addMethod(method: string): boolean {
    return method.toLowerCase().includes('one');
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------
}
