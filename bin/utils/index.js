"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLoop = exports.generate = exports.joinFiles = exports.renameFiles = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var renameFiles = function (name) {
    var args = [];
    for (var _i = 1; _i < arguments.length; _i++) {
        args[_i - 1] = arguments[_i];
    }
    var files = args.filter(function (arg) { return arg.includes('.'); });
    var unchanged = args.filter(function (arg) { return !arg.includes('.'); });
    var renamed = files.map(function (file) {
        var idx = file.indexOf('.');
        var substr = file.substring(idx);
        return name + substr;
    });
    return __spreadArrays(unchanged, renamed);
};
exports.renameFiles = renameFiles;
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
