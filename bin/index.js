#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var commands_1 = require("./utils/commands");
var _a = require('../package.json'), name = _a.name, description = _a.description, version = _a.version;
var program = new commander_1.Command(name);
program.description(description);
program.version(version, '-v, --version');
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
    .action(function (name, options, _) {
    commands_1.add(name, options);
});
program
    .command('remove <name>')
    .alias('rm')
    .description('removes a route by name', {
    name: 'name of the route to be removed',
})
    .option('-p, --path <path>', 'path of the routes root folder')
    .option('-t, --test', 'removes test file only')
    .action(function (name, options, _) {
    commands_1.remove(name, options);
});
program
    .command('list')
    .alias('ls')
    .description('lists all routes')
    .option('-p, --path <path>', 'path of the routes folder')
    .option('-r, --recursive', 'lists all routes recursively')
    .action(function (options, _) {
    commands_1.list(options);
});
program.parse();
