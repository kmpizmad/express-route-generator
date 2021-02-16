"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLoop = exports.generate = exports.joinFiles = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var joinFiles = function (folder) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var output = [];
    args.forEach(function (arg) { return output.push(path_1.join(folder, arg)); });
    return output;
};
exports.joinFiles = joinFiles;
var generate = function (_a, _b) {
    var files = _a.files, schemes = _a.schemes;
    var condition = _b.condition, position = _b.position;
    var tempFiles = files;
    var tempSchemes = schemes;
    var conditionalFiles = tempFiles.splice(position, 1);
    var conditionalSchemes = tempSchemes.splice(position, 1);
    exports.generateLoop({ files: tempFiles, schemes: tempSchemes });
    if (condition)
        exports.generateLoop({ files: conditionalFiles, schemes: conditionalSchemes });
};
exports.generate = generate;
var generateLoop = function (_a) {
    var files = _a.files, schemes = _a.schemes;
    return schemes.forEach(function (schema, i) {
        return fs_1.writeFile(files[i], schema, function () { return console.log('created', files[i]); });
    });
};
exports.generateLoop = generateLoop;
