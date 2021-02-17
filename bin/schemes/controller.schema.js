"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllerSchema = void 0;
const schemes_1 = require("../utils/schemes");
const controllerSchema = (_, methods) => `${schemes_1.controllers(methods)}`;
exports.controllerSchema = controllerSchema;
