"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.FileManager = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../errors");
var FileManager = (function () {
    function FileManager() {
    }
    FileManager.setExtensions = function (filename, extensions) {
        return extensions.map(function (extension) { return filename + extension; });
    };
    FileManager.readSchema = function (schemesDir, schemes, filename) {
        var path = path_1.join(schemesDir, schemes.filter(function (file) { return file.includes(filename); }).join(''));
        if (fs_1.lstatSync(path).isFile()) {
            return fs_1.readFileSync(path, { encoding: 'utf-8' });
        }
        else {
            var ex = new errors_1.FileNotFoundException("'" + filename + "' schema is missing in '" + schemesDir + "'");
            return ex.throw();
        }
    };
    return FileManager;
}());
exports.FileManager = FileManager;
