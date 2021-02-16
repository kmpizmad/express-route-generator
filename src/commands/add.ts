import { controllerSchema, routerSchema, testSchema } from '../schemes';
import { generate, joinFiles } from '../utils';
import { CommanderConfig } from '../types';
import { setupCommand } from '../utils/config';

export const add = (commanderConfig: CommanderConfig) => {
  const { folder, extension, name, methods, test } = setupCommand(
    commanderConfig
  );

  // File generation
  const files: string[] = joinFiles(
    folder,
    `index.${extension}`,
    `${name}.handlers.${extension}`,
    `${name}.test.${extension}`
  );

  const schemes: string[] = [
    routerSchema(name, methods),
    controllerSchema(name, methods),
    testSchema(name, methods),
  ];

  generate({ files, schemes }, { position: files.length - 1, condition: test });
};
