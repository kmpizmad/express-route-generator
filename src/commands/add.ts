import { controllerSchema, routerSchema, testSchema } from '../schemes';
import { generate, joinFiles, renameFiles } from '../utils';
import { CommanderConfig } from '../types';
import { setupCommand } from '../utils/config';
import { loadSchemes } from '../utils/schemes';

export const add = (commanderConfig: CommanderConfig) => {
  const {
    folder,
    schemes: schemesDir,
    extension,
    name,
    methods,
    test,
  } = setupCommand(commanderConfig);

  const [userFiles, userSchemes] = schemesDir ? loadSchemes(schemesDir) : [];

  // File generation
  const files: string[] = userFiles
    ? joinFiles(
        folder,
        ...renameFiles(name, ...userFiles).map(file => file + '.' + extension)
      )
    : joinFiles(
        folder,
        `index.${extension}`,
        `${name}.handlers.${extension}`,
        `${name}.test.${extension}`
      );

  const schemes: string[] = userSchemes || [
    routerSchema(name, methods),
    controllerSchema(name, methods),
    testSchema(name, methods),
  ];

  generate({ files, schemes }, { position: files.length - 1, condition: test });
};
