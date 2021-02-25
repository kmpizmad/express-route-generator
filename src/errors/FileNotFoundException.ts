import { Exception } from './Exception';

export class FileNotFoundException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
