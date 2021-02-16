import { existsSync, rm } from 'fs';
import { join } from 'path';
import { loadConfig } from '../constants';

export const remove = ({ name, path }: any) => {
  const { rootDir } = loadConfig()!;

  if (!path) path = rootDir;

  const folder = join(path, name);

  if (existsSync(folder)) {
    rm(folder, { recursive: true, force: true }, () => {
      console.log('removed', name);
    });
  } else {
    console.log(`didn't find folder '${name}' under ${path}`);
  }
};
