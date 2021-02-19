import { existsSync, readdirSync, rm } from 'fs';
import { join } from 'path';
import { loadConfig } from '../constants';
import { CommanderConfig } from '../types';

export const remove = (commanderConfig: CommanderConfig) => {
  const isMissingParams = !commanderConfig.path;
  const config = isMissingParams ? loadConfig()! : null;

  if (config) {
    if (!commanderConfig.path) commanderConfig.path = config.rootDir;
  }

  const folder = join(commanderConfig.path, commanderConfig.name);

  if (existsSync(folder)) {
    if (commanderConfig.test) {
      const file = readdirSync(folder).filter(fileName =>
        fileName.includes('.test')
      )[0];

      const testFile = join(folder, file);

      rm(testFile, () => console.log('removed', testFile));
    } else {
      rm(folder, { recursive: true, force: true }, () => {
        console.log('removed', commanderConfig.name);
      });
    }
  } else {
    console.log(
      `didn't find folder '${commanderConfig.name}' under ${commanderConfig.path}`
    );
  }
};
