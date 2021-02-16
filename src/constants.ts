import { join } from 'path';
import { Config } from './types';

export const fileName: string = 'erg.config.js';

export const errorCase = (err: any, file: string) => {
  if (err.code === 'MODULE_NOT_FOUND') {
    console.error(file, 'is missing!');
  } else {
    console.error(err);
  }
};

export const loadConfig = (): Config | undefined => {
  try {
    return require(join(process.cwd(), fileName));
  } catch (err) {
    errorCase(err, fileName);
    process.exit(1);
  }
};
