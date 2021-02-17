#!/usr/bin/env node

import { Command } from 'commander';
import { add, remove } from './commands';
import { fileName, errorCase } from './constants';

const { version, description } = require('../package.json');
const program = new Command();

program.version(version, '-v, --version');
program.description(description);

program
  .command('add <name>')
  .alias('a')
  .description('adds a new route', {
    name: 'name of the new route',
  })
  .option('-p, --path <path>', 'path of the routes root folder')
  .option('-s, --schemes <path>', 'path of the schemes root folder')
  .option('-m, --methods <methods...>', 'accepted methods')
  .option('--typescript', 'generates the files with .ts extension', false)
  .option('--no-test', 'prevents generation of test file')
  .action((name, { path, schemes, methods, typescript, test }, _: Command) => {
    try {
      add({ name, path, schemes, methods, typescript, test });
    } catch (err) {
      errorCase(err, fileName);
    }
  });

program
  .command('remove <name>')
  .alias('rm')
  .description('removes a route by name', {
    name: 'name of the route to be removed',
  })
  .option('-p, --path <path>', 'path of the routes root folder')
  .action((name, { path }, _: Command) => {
    try {
      remove({ name, path });
    } catch (err) {
      errorCase(err, fileName);
    }
  });

program.parse();
