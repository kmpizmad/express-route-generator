import { writeFile } from 'fs';
import { join } from 'path';
import { Constraint, Result } from '../types';

export const joinFiles = (folder: string, ...args: string[]) => {
  let output: string[] = [];
  args.forEach(arg => output.push(join(folder, arg)));
  return output;
};

export const generate = (
  { files, schemes }: Result,
  { condition, position }: Constraint
) => {
  const tempFiles = files;
  const tempSchemes = schemes;
  const conditionalFiles = tempFiles.splice(position, 1);
  const conditionalSchemes = tempSchemes.splice(position, 1);

  generateLoop({ files: tempFiles, schemes: tempSchemes });

  if (condition)
    generateLoop({ files: conditionalFiles, schemes: conditionalSchemes });
};

export const generateLoop = ({ files, schemes }: Result) =>
  schemes.forEach((schema, i) =>
    writeFile(files[i], schema, () => console.log('created', files[i]))
  );
