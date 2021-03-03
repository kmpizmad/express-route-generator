"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../errors");
var ConfigLoader = (function () {
    function ConfigLoader() {
    }
    ConfigLoader.prototype.load = function (files, exception) {
        var file = files.filter(function (file) { return fs_1.existsSync(file) && fs_1.lstatSync(file).isFile(); })[0];
        if (file) {
            return require(path_1.join(process.cwd(), file));
        }
        else {
            var ex = new errors_1.FileNotFoundException("Couldn't find any of these files: " + files.toString(), exception);
            throw ex;
        }
    };
    return ConfigLoader;
}());
exports.ConfigLoader = ConfigLoader;
