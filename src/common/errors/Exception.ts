import { red } from 'chalk';

export class Exception {
  constructor(public message: string, public innerException?: Exception) {
    this.message = `${red(this.constructor.name + ':')} ${message}`;

    if (innerException) {
      this.message += `\n${innerException.message}`;
    }
  }
}
