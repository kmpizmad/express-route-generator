import { join } from 'path';
import { HandlerSchema, RouterSchema, Schema, TestSchema } from '.';
import { InvalidArgumentException } from '../errors';
import { DefaultOptions, UserOptions } from '../types';
import { FileManager } from '../utils/FileManager';

export class SchemaBuilder {
  private __filename: string;
  private __methods: string[];

  constructor(filename: string, methods: string[]) {
    this.__filename = filename;
    this.__methods = methods;
  }

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

  public static userBuild(options: UserOptions) {
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

  public static defaultBuild(options: DefaultOptions) {
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

  private __buildRouter(): string {
    return `import { Router } from "express";
import { ${this.__controllers(', ', true)} } from "./${
      this.__filename
    }.handlers";

const router = Router();

router.route('/').${this.__controllers('.')};

export default router;`;
  }

  private __controllers(joinChar: string, importStatement?: boolean): string {
    return this.__methods
      .map(method => {
        return importStatement
          ? `${method}Controller`
          : `${method}(${method}Controller)`;
      })
      .join(joinChar);
  }

  private __buildHandlers(): string {
    return this.__methods
      .map(
        method =>
          `export const ${method}Controller = async (req, res, next) => {};`
      )
      .join('\n');
  }

  private __buildTests(): string {
    return `import supertest from "supertest";

describe('${this.__filename} test', () => {
  ${this.__testRoutes()}
});`;
  }

  private __testRoutes(): string {
    return this.__methods
      .map(
        method => `it('${method}', async done => {
    const response = await supertest(server).${method}('/${this.__filename}');

    // expectations

    done();
  });`
      )
      .join('\n  ');
  }
}
