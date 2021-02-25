import { red } from 'chalk';

export class Exception {
  constructor(public message: string) {
    this.message = `${red(this.constructor.name + ':')} ${message}`;
  }
}
