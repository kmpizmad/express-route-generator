"use strict";
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
var schemes_1 = require("../schemes");
var utils_1 = require("../utils");
var config_1 = require("../utils/config");
var schemes_2 = require("../utils/schemes");
var add = function (commanderConfig) {
    var _a = config_1.setupCommand(commanderConfig), folder = _a.folder, schemesDir = _a.schemes, extension = _a.extension, name = _a.name, methods = _a.methods, test = _a.test;
    var _b = schemesDir ? schemes_2.loadSchemes(schemesDir) : [], userFiles = _b[0], userSchemes = _b[1];
    var files = utils_1.joinFiles.apply(void 0, __spreadArrays([folder], utils_1.renameFiles.apply(void 0, __spreadArrays([name], userFiles)))).map(function (file) { return file + '.' + extension; }) ||
        utils_1.joinFiles(folder, "index." + extension, name + ".handlers." + extension, name + ".test." + extension);
    var schemes = userSchemes || [
        schemes_1.routerSchema(name, methods),
        schemes_1.controllerSchema(name, methods),
        schemes_1.testSchema(name, methods),
    ];
    utils_1.generate({ files: files, schemes: schemes }, { position: files.length - 1, condition: test });
};
exports.add = add;
