"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var FileManager = (function () {
    function FileManager() {
    }
    FileManager.setExtensions = function (filename, extensions) {
        return extensions.map(function (extension) { return filename + extension; });
    };
    FileManager.readSchema = function (schemesDir, schemes, filename) {
        return fs_1.readFileSync(path_1.join(schemesDir, schemes.filter(function (file) { return file.includes(filename); }).join('')), { encoding: 'utf-8' });
    };
    return FileManager;
}());
exports.FileManager = FileManager;
