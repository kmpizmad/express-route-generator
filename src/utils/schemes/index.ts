import { readdirSync, readFileSync } from 'fs';
import { join } from 'path';

export { controllers, controllersRef } from './controllers';
export { imports } from './imports';
export { tests } from './test';

export const loadSchemes = (path: string): string[][] => {
  const files: string[] = readdirSync(path, { encoding: 'utf-8' });
  const schemes: string[] = [];

  files.forEach(file => {
    const fileText: string = readFileSync(join(path, file), {
      encoding: 'utf-8',
    });
    schemes.push(fileText);
  });

  return [files, schemes];
};
