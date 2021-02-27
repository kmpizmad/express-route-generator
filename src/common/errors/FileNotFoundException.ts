import { Exception } from './Exception';

export class FileNotFoundException extends Exception {
  constructor(message: string, innerException?: Exception) {
    super(message, innerException);
  }
}
