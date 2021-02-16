"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
var addImports = function (methods) {
    return methods.map(function (method) { return method + "Controller"; }).join(', ');
};
var imports = function (name, methods) {
    return "import { " + addImports(methods) + " } from './" + name + ".handlers';";
};
exports.imports = imports;
