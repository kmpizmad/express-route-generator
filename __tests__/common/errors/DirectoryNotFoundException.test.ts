import { DirectoryNotFoundException } from '../../../src/common/errors';

describe('DirectoryNotFoundException', () => {
  const msg = 'Sample error message';
  const name = 'DirectoryNotFoundException:';

  it('Instantiates', () => {
    const ex = new DirectoryNotFoundException(msg);
    expect(ex).toBeDefined();
  });

  it('Has message', () => {
    const ex = new DirectoryNotFoundException(msg);
    expect(ex.message).toContain(msg);
    expect(ex.message).toContain(name);
  });

  it('Has inner exception', () => {
    const ex = new DirectoryNotFoundException(
      msg,
      new DirectoryNotFoundException(msg)
    );

    expect(ex?.innerException).not.toBeUndefined();
    expect(ex?.innerException?.message).toContain(msg);
    expect(ex?.innerException?.message).toContain(name);
  });

  it('Throws error', () => {
    const ex = new DirectoryNotFoundException(msg);
    expect(() => {
      throw ex;
    }).toThrowError(ex as Error);
  });
});
