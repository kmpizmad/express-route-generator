"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../../errors");
var chalk_2 = require("../../vendors/chalk");
var setupCommand_1 = require("./setupCommand");
function remove(name, options) {
    var config = setupCommand_1.setupCommand(!options.path, new errors_1.MissingParamsException('--path <path>'));
    var path = options.path || (config === null || config === void 0 ? void 0 : config.rootDir);
    var test = options.test || (config === null || config === void 0 ? void 0 : config.test);
    if (path) {
        var folder = path_1.join(path, name);
        if (fs_1.existsSync(folder) && fs_1.lstatSync(folder).isDirectory()) {
            if (test) {
                var filename_1 = name + '.test';
                var files = fs_1.readdirSync(folder);
                var testFile = files.filter(function (file) { return file.includes(filename_1); }).join('');
                var filePath = path_1.join(path, name, testFile);
                fs_1.rm(filePath, removeHandler(filePath));
            }
            else {
                fs_1.rm(folder, { recursive: true }, removeHandler(folder));
            }
        }
        else {
            throw new errors_1.FileNotFoundException(folder + " is not a directory!");
        }
    }
    else {
        throw new errors_1.MissingParamsException('--path <path>');
    }
}
exports.remove = remove;
function removeHandler(fileOrFolder) {
    return function () { return chalk_2.Chalk.writeLine(chalk_1.red, "removed " + fileOrFolder); };
}
