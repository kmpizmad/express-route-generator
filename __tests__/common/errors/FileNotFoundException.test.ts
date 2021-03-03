import { FileNotFoundException } from '../../../src/common/errors';

describe('FileNotFoundException', () => {
  const msg = 'Sample error message';
  const name = 'FileNotFoundException:';

  it('Instantiates', () => {
    const ex = new FileNotFoundException(msg);
    expect(ex).toBeDefined();
  });

  it('Has message', () => {
    const ex = new FileNotFoundException(msg);
    expect(ex.message).toContain(msg);
    expect(ex.message).toContain(name);
  });

  it('Has inner exception', () => {
    const ex = new FileNotFoundException(msg, new FileNotFoundException(msg));

    expect(ex?.innerException).not.toBeUndefined();
    expect(ex?.innerException?.message).toContain(msg);
    expect(ex?.innerException?.message).toContain(name);
  });

  it('Throws error', () => {
    const ex = new FileNotFoundException(msg);
    expect(() => {
      throw ex;
    }).toThrowError(ex as Error);
  });
});
