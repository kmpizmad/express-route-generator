import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileName, loadConfig } from '../../constants';
import { CommanderConfig } from '../../types';

export const setupCommand = (commanderConfig: CommanderConfig): any => {
  // Config
  const {
    rootDir,
    language,
    test: addTest,
    methods: defaultMethods,
  } = loadConfig()!;

  // Variables
  let extension: string;

  // Settings
  if (!commanderConfig.path) commanderConfig.path = rootDir;
  if (!commanderConfig.methods) commanderConfig.methods = defaultMethods;
  if (!commanderConfig.typescript || language === 'javascript')
    extension = 'js';
  else extension = 'ts';

  if (!commanderConfig.test) commanderConfig.test = addTest || true;

  if (commanderConfig.methods && commanderConfig.methods.length > 0)
    commanderConfig.methods.forEach((method: string) => method.toLowerCase());
  else
    return console.error(
      `please provide the -m, --methods <methods...> option or "methods" field in ${fileName}!`
    );

  // Folder generation
  if (!existsSync(commanderConfig.path)) mkdirSync(commanderConfig.path);

  const folder = join(commanderConfig.path, commanderConfig.name);
  if (!existsSync(folder)) mkdirSync(folder);

  return { ...commanderConfig, extension, folder };
};
