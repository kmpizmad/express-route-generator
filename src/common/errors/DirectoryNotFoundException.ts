import { Exception } from './Exception';

export class DirectoryNotFoundException extends Exception {
  constructor(message: string, innerException?: Exception) {
    super(message, innerException);
  }
}
