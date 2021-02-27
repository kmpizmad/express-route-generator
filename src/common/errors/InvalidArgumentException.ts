import { Exception } from './Exception';

export class InvalidArgumentException extends Exception {
  constructor(message: string, innerException?: Exception) {
    super(message, innerException);
  }
}
