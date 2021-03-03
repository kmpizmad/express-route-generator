import { join } from 'path';
import { Exception, MissingParamsException } from '../../common/errors';
import {
  HandlerSchema,
  RouterSchema,
  SchemaBuilder,
  TestSchema,
} from '../../common/schemes';
import { AddOptions } from '../../common/types';
import { ConfigLoader } from '../../common/utils';
import { CliCommand } from './CliCommand';

export class AddCommand extends CliCommand<AddOptions> {
  // * ------------------------------
  // * STATIC MEMBERS
  // * ------------------------------
  private static __exception: Exception = new MissingParamsException(
    '--path <path> and --methods <methods...>',
    new MissingParamsException('--path <path> and --schemes <path>')
  );

  private static __isMissing = (
    path: string | undefined,
    schemes: string | undefined,
    methods: string[] | undefined
  ) =>
    !(
      AddCommand.__pathWithSchemes(path, schemes) ||
      AddCommand.__pathWithMethods(path, methods)
    );

  private static __pathWithSchemes = (
    path: string | undefined,
    schemes: string | undefined
  ) => path && schemes;

  private static __pathWithMethods = (
    path: string | undefined,
    methods: string[] | undefined
  ) => path && methods;
  // * ------------------------------
  // * END OF STATIC MEMBERS
  // * ------------------------------

  private __name: string;

  constructor(
    name: string,
    options: AddOptions,
    configLoader: ConfigLoader,
    schemaBuilder: SchemaBuilder,
    files: string[]
  ) {
    super(
      options,
      configLoader,
      schemaBuilder,
      files,
      AddCommand.__isMissing(options.path, options.schemes, options.methods),
      AddCommand.__exception
    );
    this.__name = name;
  }

  // * ------------------------------
  // * PUBLIC MEMBERS
  // * ------------------------------
  public run(callback: (path: string) => void): void {
    const setup = this.__setup();

    if (setup.stillMissing) {
      if (!setup.path) {
        throw new MissingParamsException('--path <path>');
      }

      throw new MissingParamsException('--methods <methods...>');
    }

    if (setup.path && setup.schemes) {
      this._schemaBuilder.userBuild(
        {
          path: setup.path,
          filename: this.__name,
          extension: setup.extension,
          schemesDir: setup.schemes,
        },
        callback
      );
    }

    if (setup.path && setup.methods) {
      this._schemaBuilder.defaultBuild(
        [
          new RouterSchema(setup.methods, this._schemaBuilder),
          new HandlerSchema(this.__name, setup.methods, this._schemaBuilder),
          new TestSchema(
            this.__name,
            setup.methods,
            this._schemaBuilder,
            setup.testFile
          ),
        ],
        {
          path: join(setup.path, this.__name),
          extension: setup.extension,
        },
        callback
      );
    }
  }
  // * ------------------------------
  // * END OF PUBLIC MEMBERS
  // * ------------------------------

  // * ------------------------------
  // * PRIVATE MEMBERS
  // * ------------------------------
  private __setup() {
    const isTypescript =
      this._options.typescript || this._config?.language === 'typescript';
    const hasTestFile =
      this._config?.test !== undefined && this._options.test
        ? this._config?.test
        : this._options.test;

    // Set values
    const path = this._options.path || this._config?.rootDir;
    const schemes = this._options.schemes || this._config?.schemesDir;
    const methods = this._options.methods || this._config?.methods;
    const extension = isTypescript ? '.ts' : '.js';
    const testFile = hasTestFile;

    const stillMissing = AddCommand.__isMissing(path, schemes, methods);

    return { path, schemes, methods, extension, testFile, stillMissing };
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------
}
