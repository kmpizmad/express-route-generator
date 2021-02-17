"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommand = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var constants_1 = require("../../constants");
var setupCommand = function (commanderConfig) {
    var _a = constants_1.loadConfig(), rootDir = _a.rootDir, schemesDir = _a.schemesDir, language = _a.language, addTest = _a.test, defaultMethods = _a.methods;
    var extension;
    if (!commanderConfig.path)
        commanderConfig.path = rootDir;
    if (!commanderConfig.schemes)
        commanderConfig.schemes = schemesDir;
    if (!commanderConfig.methods)
        commanderConfig.methods = defaultMethods;
    if (!commanderConfig.typescript || language === 'javascript')
        extension = 'js';
    else
        extension = 'ts';
    if (!commanderConfig.test)
        commanderConfig.test = addTest || true;
    if (commanderConfig.methods && commanderConfig.methods.length > 0)
        commanderConfig.methods.forEach(function (method) { return method.toLowerCase(); });
    else
        return console.error("please provide the -m, --methods <methods...> option or \"methods\" field in " + constants_1.fileName + "!");
    if (!fs_1.existsSync(commanderConfig.path))
        fs_1.mkdirSync(commanderConfig.path);
    var folder = path_1.join(commanderConfig.path, commanderConfig.name);
    if (!fs_1.existsSync(folder))
        fs_1.mkdirSync(folder);
    return __assign(__assign({}, commanderConfig), { extension: extension, folder: folder });
};
exports.setupCommand = setupCommand;
