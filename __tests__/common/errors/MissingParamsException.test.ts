import { MissingParamsException } from '../../../src/common/errors';

describe('MissingParamsException', () => {
  const msg = 'Sample error message';
  const name = 'MissingParamsException:';

  it('Instantiates', () => {
    const ex = new MissingParamsException(msg);
    expect(ex).toBeDefined();
  });

  it('Has message', () => {
    const ex = new MissingParamsException(msg);
    expect(ex.message).toContain(msg);
    expect(ex.message).toContain(name);
  });

  it('Has inner exception', () => {
    const ex = new MissingParamsException(msg, new MissingParamsException(msg));

    expect(ex?.innerException).not.toBeUndefined();
    expect(ex?.innerException?.message).toContain(msg);
    expect(ex?.innerException?.message).toContain(name);
  });

  it('Throws error', () => {
    const ex = new MissingParamsException(msg);
    expect(() => {
      throw ex;
    }).toThrowError(ex as Error);
  });
});
