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
    FileManager.readSchema = function (schemesDir, filename) {
        if (fs_1.existsSync(schemesDir) && fs_1.lstatSync(schemesDir).isDirectory()) {
            var schemes = fs_1.readdirSync(schemesDir);
            var path = path_1.join(schemesDir, schemes.filter(function (file) { return file.includes(filename); }).join(''));
            if (fs_1.existsSync(path) && fs_1.lstatSync(path).isFile()) {
                return fs_1.readFileSync(path, { encoding: 'utf-8' });
            }
            else {
                throw new errors_1.FileNotFoundException("'" + filename + "' schema is missing in '" + schemesDir + "'.");
            }
        }
        else {
            throw new errors_1.DirectoryNotFoundException("'" + schemesDir + "' is missing.");
        }
    };
    return FileManager;
}());
exports.FileManager = FileManager;
