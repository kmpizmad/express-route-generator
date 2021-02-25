import {
  InvalidArgumentException,
  MissingParamsException,
} from '../src/errors';
import { SchemaBuilder } from '../src/schemes';
import { setupCommand } from '../src/utils/commands/setupCommand';

describe('Exception class', () => {
  it('MissingArgumentException throws', () => {
    const ex = new MissingParamsException(
      '--path <path>, --methods <methods...>'
    );
    expect(() => {
      setupCommand(true, ex);
    }).toThrowError(ex as Error);
  });
  it('InvalidArgumentException throws', () => {
    expect(() => {
      const schemaBuilder = new SchemaBuilder('testRoute', ['get', 'post']);
      schemaBuilder.build('buildSomething');
    }).toThrowError(
      new InvalidArgumentException(
        "Couldn't recognize build pattern 'buildSomething'"
      ) as Error
    );
  });
});
