"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadSchemes = exports.tests = exports.imports = exports.controllersRef = exports.controllers = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
var controllers_1 = require("./controllers");
Object.defineProperty(exports, "controllers", { enumerable: true, get: function () { return controllers_1.controllers; } });
Object.defineProperty(exports, "controllersRef", { enumerable: true, get: function () { return controllers_1.controllersRef; } });
var imports_1 = require("./imports");
Object.defineProperty(exports, "imports", { enumerable: true, get: function () { return imports_1.imports; } });
var test_1 = require("./test");
Object.defineProperty(exports, "tests", { enumerable: true, get: function () { return test_1.tests; } });
const loadSchemes = (path) => {
    const files = fs_1.readdirSync(path, { encoding: 'utf-8' });
    const schemes = [];
    files.forEach(file => {
        const fileText = fs_1.readFileSync(path_1.join(path, file), {
            encoding: 'utf-8',
        });
        schemes.push(fileText);
    });
    return [files, schemes];
};
exports.loadSchemes = loadSchemes;
