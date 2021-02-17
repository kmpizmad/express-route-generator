"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerSchema = void 0;
var schemes_1 = require("../utils/schemes");
var controllerSchema = function (_, methods) {
    return "" + schemes_1.controllers(methods);
};
exports.controllerSchema = controllerSchema;
