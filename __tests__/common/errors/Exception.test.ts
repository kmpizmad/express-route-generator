import { Exception } from '../../../src/common/errors';

describe('Exception', () => {
  const msg = 'Sample error message';
  const name = 'Exception:';

  it('Instantiates', () => {
    const ex = new Exception(msg);
    expect(ex).toBeDefined();
  });

  it('Has message', () => {
    const ex = new Exception(msg);
    expect(ex.message).toContain(msg);
    expect(ex.message).toContain(name);
  });

  it('Has inner exception', () => {
    const ex = new Exception(msg, new Exception(msg));

    expect(ex?.innerException).not.toBeUndefined();
    expect(ex?.innerException?.message).toContain(msg);
    expect(ex?.innerException?.message).toContain(name);
  });

  it('Throws error', () => {
    const ex = new Exception(msg);
    expect(() => {
      throw ex;
    }).toThrowError(ex as Error);
  });
});
