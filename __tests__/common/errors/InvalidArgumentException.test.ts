import { InvalidArgumentException } from '../../../src/common/errors';

describe('InvalidArgumentException', () => {
  const msg = 'Sample error message';
  const name = 'InvalidArgumentException:';

  it('Instantiates', () => {
    const ex = new InvalidArgumentException(msg);
    expect(ex).toBeDefined();
  });

  it('Has message', () => {
    const ex = new InvalidArgumentException(msg);
    expect(ex.message).toContain(msg);
    expect(ex.message).toContain(name);
  });

  it('Has inner exception', () => {
    const ex = new InvalidArgumentException(
      msg,
      new InvalidArgumentException(msg)
    );

    expect(ex?.innerException).not.toBeUndefined();
    expect(ex?.innerException?.message).toContain(msg);
    expect(ex?.innerException?.message).toContain(name);
  });

  it('Throws error', () => {
    const ex = new InvalidArgumentException(msg);
    expect(() => {
      throw ex;
    }).toThrowError(ex as Error);
  });
});
