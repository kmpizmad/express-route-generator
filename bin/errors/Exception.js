"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var chalk_1 = require("chalk");
var Exception = (function () {
    function Exception(message) {
        this.message = message;
        this.message = chalk_1.red(this.constructor.name + ':') + " " + message;
    }
    return Exception;
}());
exports.Exception = Exception;
