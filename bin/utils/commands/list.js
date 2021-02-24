"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var errors_1 = require("../../errors");
var setupCommand_1 = require("./setupCommand");
function list(options) {
    var config = setupCommand_1.setupCommand(!options.path, new errors_1.MissingParamsException('--path <path>'));
    var path = options.path || (config === null || config === void 0 ? void 0 : config.rootDir);
    if (path) {
        fs_1.readdir(path, function (err, files) {
            if (err) {
                var ex = new errors_1.Exception(err.message);
                ex.throw();
            }
            console.log(chalk_1.yellow(files.join('  ')));
        });
    }
}
exports.list = list;
