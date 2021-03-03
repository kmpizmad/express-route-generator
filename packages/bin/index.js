#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var chalk_1 = require("chalk");
var commander_1 = require("commander");
var schemes_1 = require("../common/schemes");
var utils_1 = require("../common/utils");
var commands_1 = require("./commands");
var _a = require('../../package.json'), name = _a.name, description = _a.description, version = _a.version;
var program = new commander_1.Command(name);
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
    .action(function (name, options) {
    try {
        var schemaBuilder = new schemes_1.SchemaBuilder(new utils_1.FileManager());
        var command = new commands_1.AddCommand(name, options, new utils_1.ConfigLoader(), schemaBuilder, schemaBuilder.fileManager.setExtensions('erg.config', ['.js', '.json']));
        command.run(function (file) { return console.log(chalk_1.green("created " + file)); });
    }
    catch (err) {
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
    .action(function (name, options) {
    try {
        var schemaBuilder = new schemes_1.SchemaBuilder(new utils_1.FileManager());
        var command = new commands_1.RemoveCommand(name, options, new utils_1.ConfigLoader(), schemaBuilder, schemaBuilder.fileManager.setExtensions('erg.config', ['.js', '.json']));
        command.run(function (file) { return console.log(chalk_1.red("removed " + file)); });
    }
    catch (err) {
        console.log(err.message);
    }
});
program
    .command('list')
    .alias('ls')
    .description('lists all routes')
    .option('-p, --path <path>', 'path of the \'routes\' folder')
    .option('-r, --recursive', 'recursively prints folders and files')
    .action(function (options) {
    try {
        var schemaBuilder = new schemes_1.SchemaBuilder(new utils_1.FileManager());
        var command = new commands_1.ListCommand(options, new utils_1.ConfigLoader(), schemaBuilder, schemaBuilder.fileManager.setExtensions('erg.config', ['.js', '.json']));
        command.run();
    }
    catch (err) {
        console.log(err.message);
    }
});
program.parse();
