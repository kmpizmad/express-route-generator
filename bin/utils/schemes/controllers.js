"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.controllersRef = exports.controllers = void 0;
var controllers = function (methods) {
    return methods.map(function (method) { return addController(method); }).join('\n');
};
exports.controllers = controllers;
var controllersRef = function (methods) {
    return methods.map(function (method) { return addControllerRef(method); }).join('');
};
exports.controllersRef = controllersRef;
var addController = function (method) {
    return "export const " + method + "Controller = async (req, res, next) => {};";
};
var addControllerRef = function (method) { return "." + method + "(" + method + "Controller)"; };
