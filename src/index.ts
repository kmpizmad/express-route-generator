#!/usr/bin/env node

import { Command } from 'commander';
import { Add, List, Remove } from './types';
import { add, list, remove } from './utils/commands';

const { name, description, version } = require('../package.json');
const program = new Command(name);

program.description(description);
program.version(version, '-v, --version');

program
  .command('add <name>')
  .alias('a')
  .description('adds a new route', {
    name: 'name of the new route',
  })
  .option('-p, --path <path>', "path of the 'routes' folder")
  .option('-s, --schemes <path>', "path of the 'schemes' folder")
  .option('-m, --methods <methods...>', 'accepted methods')
  .option('--typescript', 'generates the files with .ts extension', false)
  .option('--no-test', 'prevents generation of test file')
  .action((name, options: Add, _: Command) => {
    try {
      add(name, options);
    } catch (err) {
      console.log(err.message);
    }
  });

program
  .command('remove <name>')
  .alias('rm')
  .description('removes a route by name', {
    name: 'name of the route to be removed',
  })
  .option('-p, --path <path>', "path of the 'routes' folder")
  .option('-t, --test', 'removes test file only')
  .action((name, options: Remove, _: Command) => {
    try {
      remove(name, options);
    } catch (err) {
      console.log(err.message);
    }
  });

program
  .command('list')
  .alias('ls')
  .description('lists all routes')
  .option('-p, --path <path>', "path of the 'routes' folder")
  .option('-r, --recursive', 'recursively prints folders and files')
  .action((options: List, _: Command) => {
    try {
      list(options);
    } catch (err) {
      console.log(err.message);
    }
  });

program.parse();
