import { Exception } from './Exception';

export class MissingParamsException extends Exception {
  constructor(message: string, innerException?: Exception) {
    super(message, innerException);
  }
}
