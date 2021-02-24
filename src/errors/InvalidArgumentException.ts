import { Exception } from './Exception';

export class InvalidArgumentException extends Exception {
  constructor(message: string, exception?: Exception) {
    super(message, exception);
  }
}
