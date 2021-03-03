#!/usr/bin/env node

import { green, red } from 'chalk';
import { Command } from 'commander';
import { SchemaBuilder } from '../common/schemes';
import { AddOptions, ListOptions, RemoveOptions } from '../common/types';
import { ConfigLoader, FileManager } from '../common/utils';
import { AddCommand, ListCommand, RemoveCommand } from './commands';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const { name, description, version } = require('../../package.json');
const program = new Command(name);

program.description(description);
program.version(version, '-v, --version');

program
  .command('add <name>')
  .alias('a')
  .description('adds a new route', {
    name: 'name of the new route',
  })
  .option('-p, --path <path>', 'path of the \'routes\' folder')
  .option('-s, --schemes <path>', 'path of the \'schemes\' folder')
  .option('-m, --methods <methods...>', 'accepted methods')
  .option('--typescript', 'generates the files with .ts extension', false)
  .option('--no-test', 'prevents generation of test file')
  .action((name, options: AddOptions) => {
    try {
      const schemaBuilder = new SchemaBuilder(new FileManager());
      const command = new AddCommand(
        name,
        options,
        new ConfigLoader(),
        schemaBuilder,
        schemaBuilder.fileManager.setExtensions('erg.config', ['.js', '.json'])
      );
      command.run(file => console.log(green(`created ${file}`)));
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
  .option('-p, --path <path>', 'path of the \'routes\' folder')
  .option('-t, --test', 'removes test file only')
  .action((name, options: RemoveOptions) => {
    try {
      const schemaBuilder = new SchemaBuilder(new FileManager());
      const command = new RemoveCommand(
        name,
        options,
        new ConfigLoader(),
        schemaBuilder,
        schemaBuilder.fileManager.setExtensions('erg.config', ['.js', '.json'])
      );
      command.run(file => console.log(red(`removed ${file}`)));
    } catch (err) {
      console.log(err.message);
    }
  });

program
  .command('list')
  .alias('ls')
  .description('lists all routes')
  .option('-p, --path <path>', 'path of the \'routes\' folder')
  .option('-r, --recursive', 'recursively prints folders and files')
  .action((options: ListOptions) => {
    try {
      const schemaBuilder = new SchemaBuilder(new FileManager());
      const command = new ListCommand(
        options,
        new ConfigLoader(),
        schemaBuilder,
        schemaBuilder.fileManager.setExtensions('erg.config', ['.js', '.json'])
      );
      command.run();
    } catch (err) {
      console.log(err.message);
    }
  });

program.parse();
