import { existsSync, mkdirSync } from 'fs';
import { join } from 'path';
import { fileName, loadConfig } from '../../constants';
import { CommanderConfig } from '../../types';

export const setupCommand = (commanderConfig: CommanderConfig): any => {
  // Config
  const pathWithMethods = commanderConfig.path && commanderConfig.methods;
  const pathWithSchemes = commanderConfig.path && commanderConfig.schemes;
  const isMissingParams = !(pathWithMethods || pathWithSchemes);
  const config = isMissingParams ? loadConfig()! : null;

  // Variables
  let extension: string;

  // Settings
  if (config) {
    if (!commanderConfig.path) commanderConfig.path = config.rootDir;
    if (!commanderConfig.schemes) commanderConfig.schemes = config.schemesDir;
    if (!commanderConfig.methods) commanderConfig.methods = config.methods;
  }
  if (commanderConfig.typescript || config?.language === 'typescript')
    extension = 'ts';
  else extension = 'js';

  if (commanderConfig.test && config?.test !== undefined)
    commanderConfig.test = config.test;

  if (commanderConfig.methods && commanderConfig.methods.length > 0)
    commanderConfig.methods.forEach((method: string) => method.toLowerCase());
  else
    return console.error(
      `please provide the -m, --methods <methods...> option or "methods" field in ${fileName}!`
    );

  // Folder generation
  if (!existsSync(commanderConfig.path))
    mkdirSync(commanderConfig.path, { recursive: true });

  const folder = join(commanderConfig.path, commanderConfig.name);
  if (!existsSync(folder)) mkdirSync(folder);

  return { ...commanderConfig, extension, folder };
};
