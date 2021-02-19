"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var constants_1 = require("../constants");
var remove = function (commanderConfig) {
    var isMissingParams = !commanderConfig.path;
    var config = isMissingParams ? constants_1.loadConfig() : null;
    if (config) {
        if (!commanderConfig.path)
            commanderConfig.path = config.rootDir;
    }
    var folder = path_1.join(commanderConfig.path, commanderConfig.name);
    if (fs_1.existsSync(folder)) {
        if (commanderConfig.test) {
            var file = fs_1.readdirSync(folder).filter(function (fileName) {
                return fileName.includes('.test');
            })[0];
            var testFile_1 = path_1.join(folder, file);
            fs_1.rm(testFile_1, function () { return console.log('removed', testFile_1); });
        }
        else {
            fs_1.rm(folder, { recursive: true, force: true }, function () {
                console.log('removed', commanderConfig.name);
            });
        }
    }
    else {
        console.log("didn't find folder '" + commanderConfig.name + "' under " + commanderConfig.path);
    }
};
exports.remove = remove;
