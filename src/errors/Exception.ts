import { red } from 'chalk';

export class Exception {
  public message: string;
  protected _exception: Exception | undefined;

  constructor(message: string, exception?: Exception) {
    this.message = `${red(this.constructor.name + ':')} ${message}`;
    this._exception = exception;
  }

  public throw(): never {
    console.log(this.message, this._exception ? this._exception.message : '');
    process.exit(1);
  }
}
