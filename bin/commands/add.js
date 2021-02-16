"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
var schemes_1 = require("../schemes");
var utils_1 = require("../utils");
var config_1 = require("../utils/config");
var add = function (commanderConfig) {
    var _a = config_1.setupCommand(commanderConfig), folder = _a.folder, extension = _a.extension, name = _a.name, methods = _a.methods, test = _a.test;
    var files = utils_1.joinFiles(folder, "index." + extension, name + ".handlers." + extension, name + ".test." + extension);
    var schemes = [
        schemes_1.routerSchema(name, methods),
        schemes_1.controllerSchema(name, methods),
        schemes_1.testSchema(name, methods),
    ];
    utils_1.generate({ files: files, schemes: schemes }, { position: files.length - 1, condition: test });
};
exports.add = add;
