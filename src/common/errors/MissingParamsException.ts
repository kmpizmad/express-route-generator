import { Exception } from './Exception';

export class MissingParamsException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
