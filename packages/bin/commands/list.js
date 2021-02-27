"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.list = void 0;
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../../common/errors");
var chalk_2 = require("../../common/vendors/chalk");
var setupCommand_1 = require("./setupCommand");
function list(options) {
    var config = setupCommand_1.setupCommand(!options.path, new errors_1.MissingParamsException('--path <path>'));
    var path = options.path || (config === null || config === void 0 ? void 0 : config.rootDir);
    var recursive = options.recursive;
    if (path) {
        if (recursive) {
            recursiveListing(path, 0, function (file, ind, isDir) {
                if (ind === 0)
                    return;
                else
                    chalk_2.Chalk.writeLine(isDir ? chalk_1.yellow : chalk_1.white, createMsg(file, ind));
            });
        }
        else {
            listHandler(path, function (files) { return chalk_2.Chalk.writeLine(chalk_1.yellow, files.join('  ')); });
        }
    }
}
exports.list = list;
function listHandler(path, callback) {
    if (fs_1.existsSync(path) && fs_1.lstatSync(path).isDirectory()) {
        callback(fs_1.readdirSync(path));
    }
    else {
        throw new errors_1.DirectoryNotFoundException("Couldn't find directory '" + path + "'.");
    }
}
function recursiveListing(path, indentation, callback) {
    if (fs_1.existsSync(path)) {
        if (fs_1.lstatSync(path).isDirectory()) {
            callback(path, indentation, true);
            fs_1.readdirSync(path).forEach(function (file) {
                return recursiveListing(path_1.join(path, file), indentation + 1, callback);
            });
        }
        else {
            callback(path, indentation, false);
        }
    }
    else {
        throw new errors_1.FileNotFoundException("Couldn't find '" + path + "'.");
    }
}
function createMsg(filename, indentation) {
    var ind = '';
    for (var i = 0; i < indentation / 2; i++) {
        ind += ' ';
    }
    var msg = function (filename) {
        var file = filename.split(/[\\|\/]/).pop();
        return fs_1.lstatSync(filename).isDirectory() ? file : ind + '└ ' + file;
    };
    return msg(filename);
}
