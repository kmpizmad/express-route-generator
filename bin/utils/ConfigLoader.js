"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigLoader = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../errors");
var ConfigLoader = (function () {
    function ConfigLoader() {
    }
    ConfigLoader.load = function (files, exception) {
        for (var i = 0; i < files.length; i++) {
            var file = path_1.join(process.cwd(), files[i]);
            if (fs_1.existsSync(file) && fs_1.lstatSync(file).isFile()) {
                var config = require(file);
                return config;
            }
        }
        var ex = exception ||
            new errors_1.FileNotFoundException("Couldn't find any of these files: " + files.toString());
        return ex.throw();
    };
    return ConfigLoader;
}());
exports.ConfigLoader = ConfigLoader;
