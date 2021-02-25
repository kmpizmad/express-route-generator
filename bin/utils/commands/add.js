"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
var errors_1 = require("../../errors");
var schemes_1 = require("../../schemes");
var setupCommand_1 = require("./setupCommand");
function add(name, options) {
    var isMissing = !(pathWithSchemes(options.path, options.schemes) ||
        pathWithMethods(options.path, options.methods));
    var config = setupCommand_1.setupCommand(isMissing, new errors_1.MissingParamsException('--path <path>, --methods <methods...>'));
    var isTypescript = options.typescript || (config === null || config === void 0 ? void 0 : config.language) === 'typescript';
    var hasTestFile = (config === null || config === void 0 ? void 0 : config.test) !== undefined && options.test ? config === null || config === void 0 ? void 0 : config.test : options.test;
    var path = options.path || (config === null || config === void 0 ? void 0 : config.rootDir);
    var schemes = options.schemes || (config === null || config === void 0 ? void 0 : config.schemesDir);
    var methods = options.methods || (config === null || config === void 0 ? void 0 : config.methods);
    var extension = isTypescript ? '.ts' : '.js';
    var testFile = hasTestFile;
    var stillMissing = !(pathWithSchemes(path, schemes) || pathWithMethods(path, methods));
    if (stillMissing) {
        if (!path) {
            throw new errors_1.MissingParamsException('--path <path>');
        }
        throw new errors_1.MissingParamsException('--methods <methods...>');
    }
    if (path && schemes) {
        schemes_1.SchemaBuilder.userBuild({
            path: path,
            filename: name,
            extension: extension,
            schemesDir: schemes,
        });
    }
    if (path && methods) {
        schemes_1.SchemaBuilder.defaultBuild({
            path: path,
            filename: name,
            extension: extension,
            methods: methods,
            test: testFile,
        });
    }
}
exports.add = add;
function pathWithSchemes(path, schemes) {
    return path && schemes;
}
function pathWithMethods(path, methods) {
    return path && methods;
}
