#!/usr/bin/env node
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var commander_1 = require("commander");
var commands_1 = require("./commands");
var constants_1 = require("./constants");
var _a = require('../package.json'), version = _a.version, description = _a.description;
var program = new commander_1.Command();
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
    .action(function (name, _a, _) {
    var path = _a.path, schemes = _a.schemes, methods = _a.methods, typescript = _a.typescript, test = _a.test;
    try {
        commands_1.add({ name: name, path: path, schemes: schemes, methods: methods, typescript: typescript, test: test });
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
    .option('-t, --test', 'removes test file only')
    .action(function (name, options, _) {
    try {
        commands_1.remove(__assign({ name: name }, options));
    }
    catch (err) {
        constants_1.errorCase(err, constants_1.fileName);
    }
});
program
    .command('list')
    .alias('ls')
    .description('lists all routes')
    .option('-p, --path <path>', 'path of the routes folder')
    .action(function (_options, _) {
    console.log('Work in progress..');
});
program.parse();
