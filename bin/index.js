#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const commander_1 = require("commander");
const commands_1 = require("./commands");
const constants_1 = require("./constants");
const { version, description } = require('../package.json');
const program = new commander_1.Command();
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
    .option('--no-test', 'prevents generation of test file', false)
    .action((name, { path, schemes, methods, typescript, test }, _) => {
    try {
        commands_1.add({ name, path, schemes, methods, typescript, test });
    }
    catch (err) {
        constants_1.errorCase(err, constants_1.fileName);
    }
});
program
    .command('remove <name>')
    .alias('rm')
    .description('removes a route by name', {
    name: 'name of the route to be removed',
})
    .option('-p, --path <path>', 'path of the routes root folder')
    .action((name, { path }, _) => {
    try {
        commands_1.remove({ name, path });
    }
    catch (err) {
        constants_1.errorCase(err, constants_1.fileName);
    }
});
program.parse();
