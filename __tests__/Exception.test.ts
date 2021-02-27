import {
  DirectoryNotFoundException,
  Exception,
  FileNotFoundException,
  InvalidArgumentException,
  MissingParamsException,
} from '../src/common/errors';

function toCatchException(ex: Exception, msg: string) {
  return () => {
    try {
      throw ex;
    } catch (e) {
      expect(e.message).toContain(msg);
    }
  };
}

describe('Exception class', () => {
  const msg = 'Test message';

  it('Exception catched', () => {
    const ex = new Exception(msg, new Exception(msg));
    expect(ex.message).toContain(msg);
    expect(toCatchException(ex, msg)).not.toThrowError(ex as Error);
  });

  it('FileNotFoundException catched', () => {
    const ex = new FileNotFoundException(msg);
    expect(ex.message).toContain(msg);
    expect(toCatchException(ex, msg)).not.toThrowError(ex as Error);
  });

  it('DirectoryNotFoundException catched', () => {
    const ex = new DirectoryNotFoundException(msg);
    expect(ex.message).toContain(msg);
    expect(toCatchException(ex, msg)).not.toThrowError(ex as Error);
  });

  it('InvalidArgumentException catched', () => {
    const ex = new InvalidArgumentException(msg);
    expect(ex.message).toContain(msg);
    expect(toCatchException(ex, msg)).not.toThrowError(ex as Error);
  });

  it('MissingArgumentException catched', () => {
    const ex = new MissingParamsException(msg);
    expect(ex.message).toContain(msg);
    expect(toCatchException(ex, msg)).not.toThrowError(ex as Error);
  });
});
