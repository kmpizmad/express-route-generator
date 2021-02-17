"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllersRef = exports.controllers = void 0;
const controllers = (methods) => methods.map(method => addController(method)).join('\n');
exports.controllers = controllers;
const controllersRef = (methods) => methods.map(method => addControllerRef(method)).join('');
exports.controllersRef = controllersRef;
const addController = (method) => `export const ${method}Controller = async (req, res, next) => {};`;
const addControllerRef = (method) => `.${method}(${method}Controller)`;
