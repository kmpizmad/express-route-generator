import { Exception } from './Exception';

export class FileNotFoundException extends Exception {
  constructor(message: string, exception?: Exception) {
    super(message, exception);
  }
}
