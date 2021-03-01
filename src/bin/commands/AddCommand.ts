import { Exception, MissingParamsException } from '../../common/errors';
import { SchemaBuilder } from '../../common/schemes';
import { AddOptions } from '../../common/types';
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

  constructor(public name: string, options: AddOptions) {
    super(
      options,
      AddCommand.__isMissing(options.path, options.schemes, options.methods),
      AddCommand.__exception
    );
  }

  // * ------------------------------
  // * PUBLIC MEMBERS
  // * ------------------------------
  public run(): void {
    const setup = this.__setup();

    if (setup.stillMissing) {
      if (!setup.path) {
        throw new MissingParamsException('--path <path>');
      }

      throw new MissingParamsException('--methods <methods...>');
    }

    if (setup.path && setup.schemes) {
      SchemaBuilder.userBuild({
        path: setup.path,
        filename: this.name,
        extension: setup.extension,
        schemesDir: setup.schemes,
      });
    }

    if (setup.path && setup.methods) {
      SchemaBuilder.defaultBuild({
        path: setup.path,
        filename: this.name,
        extension: setup.extension,
        methods: setup.methods,
        test: setup.testFile,
      });
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
      this.options.typescript || this._config?.language === 'typescript';
    const hasTestFile =
      this._config?.test !== undefined && this.options.test
        ? this._config?.test
        : this.options.test;

    // Set values
    const path = this.options.path || this._config?.rootDir;
    const schemes = this.options.schemes || this._config?.schemesDir;
    const methods = this.options.methods || this._config?.methods;
    const extension = isTypescript ? '.ts' : '.js';
    const testFile = hasTestFile;

    const stillMissing = AddCommand.__isMissing(path, schemes, methods);

    return { path, schemes, methods, extension, testFile, stillMissing };
  }
  // * ------------------------------
  // * END OF PRIVATE MEMBERS
  // * ------------------------------
}
