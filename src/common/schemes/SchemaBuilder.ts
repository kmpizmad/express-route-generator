import { Schema } from '.';
import { InvalidArgumentException } from '../errors';
import { DefaultOptions, UserOptions } from '../types';
import { ArrayFormatter, FileManager } from '../utils';

export class SchemaBuilder {
  public fileManager: FileManager;
  public name: string;
  public methods: string[];

  private __normalMethods: string[];
  private __paramMethods: string[];

  constructor(fileManager: FileManager) {
    this.fileManager = fileManager;
  }

  // * ------------------------------
  // * PUBLIC MEMBERS
  // * ------------------------------
  public build(name: string, methods: string[]): [string, string, string] {
    this.name = name;
    this.methods = methods;

    if (methods.length === 0) {
      throw new InvalidArgumentException(
        'Expected \'methods\' to have at least 1 item, recieved 0.'
      );
    }

    this.__divideMethods(methods);

    return [this.__buildRouter(), this.__buildHandlers(), this.__buildTests()];
  }

  public userBuild(
    options: UserOptions,
    callback: (path: string) => void
  ): void {
    const { path, filename, extension, schemesDir } = options;
    const routerSchema = this.fileManager.readSchema(schemesDir, 'index');
    const handlerSchema = this.fileManager.readSchema(schemesDir, '.handlers');
    const testSchema = this.fileManager.readSchema(schemesDir, '.test');

    const router = new Schema('index', routerSchema);
    const handlers = new Schema(filename + '.handlers', handlerSchema);
    const test = new Schema(filename + '.test', testSchema);

    [router, handlers, test].forEach(schema => {
      schema.build(path, extension, callback);
    });
  }

  public defaultBuild(
    schemes: Schema[],
    options: DefaultOptions,
    callback: (path: string) => void
  ): void {
    schemes.forEach(schema => {
      schema.build(options.path, options.extension, callback);
    });
  }
  // * ------------------------------
  // * END OF PUBLIC MEMBERS
  // * ------------------------------

  // * ------------------------------
  // * PRIVATE MEMBERS
  // * ------------------------------
  private __buildRouter(): string {
    const allControllers: string = this.methods
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
      this.name +
      '.handlers";\n\n';

    const routerInstance = 'const router = Router();\n';
    const normalRouter = normalControllers
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
    return this.methods
      .map(
        method =>
          `export const ${method}Handler = async (req, res, next) => {};`
      )
      .join('\n');
  }

  private __buildTests(): string {
    const imports = 'import supertest from "supertest";\n\n';
    const tests: string = this.methods
      .map(
        method =>
          `it("${method}", async done => {\n\t\tconst response = await supertest(server).${this.__normalizeMethod(
            method
          )}("/${this.name}");\n\t\t// Expectations\n\t\tdone();\n\t});`
      )
      .join('\n\t');

    const describe = `describe("${this.name} test", () => {\n\t${tests}\n});`;

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
