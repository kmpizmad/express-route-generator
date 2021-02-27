import { Exception } from './Exception';

export class DirectoryNotFoundException extends Exception {
  constructor(message: string) {
    super(message);
  }
}
