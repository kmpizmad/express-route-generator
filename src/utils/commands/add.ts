import { MissingParamsException } from '../../errors';
import { SchemaBuilder } from '../../schemes';
import { Add } from '../../types';
import { setupCommand } from './setupCommand';

export function add(name: string, options: Add) {
  const isMissing = !(
    pathWithSchemes(options.path, options.schemes) ||
    pathWithMethods(options.path, options.methods)
  );

  const config = setupCommand(
    isMissing,
    new MissingParamsException('path, methods')
  );

  const isTypescript = options.typescript || config?.language === 'typescript';
  const hasTestFile =
    config?.test !== undefined && options.test ? config?.test : options.test;

  // Set values
  const path = options.path || config?.rootDir;
  const schemes = options.schemes || config?.schemesDir;
  const methods = options.methods || config?.methods;
  const extension = isTypescript ? '.ts' : '.js';
  const testFile = hasTestFile;

  const stillMissing = !(
    pathWithSchemes(path, schemes) || pathWithMethods(path, methods)
  );

  // Throw error
  if (stillMissing) {
    if (!path) {
      const exception = new MissingParamsException('path');
      exception.throw();
    }

    const exception = new MissingParamsException('methods');
    exception.throw();
  }

  // User defined schemes
  if (path && schemes) {
    SchemaBuilder.userBuild({
      path,
      filename: name,
      extension,
      schemesDir: schemes,
    });
  }

  // Default schemes
  if (path && methods) {
    SchemaBuilder.defaultBuild({
      path,
      filename: name,
      extension,
      methods,
      test: testFile,
    });
  }
}

function pathWithSchemes(
  path: string | undefined,
  schemes: string | undefined
) {
  return path && schemes;
}
function pathWithMethods(
  path: string | undefined,
  methods: string[] | undefined
) {
  return path && methods;
}
