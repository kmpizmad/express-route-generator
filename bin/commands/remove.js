"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var constants_1 = require("../constants");
var remove = function (_a) {
    var name = _a.name, path = _a.path;
    var rootDir = constants_1.loadConfig().rootDir;
    if (!path)
        path = rootDir;
    var folder = path_1.join(path, name);
    if (fs_1.existsSync(folder)) {
        fs_1.rm(folder, { recursive: true, force: true }, function () {
            console.log('removed', name);
        });
    }
    else {
        console.log("didn't find folder '" + name + "' under " + path);
    }
};
exports.remove = remove;
