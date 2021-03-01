"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var chalk_1 = require("chalk");
var Exception = (function () {
    function Exception(message, innerException) {
        this.message = message;
        this.innerException = innerException;
        this.message = chalk_1.red(this.constructor.name + ':') + " " + message;
        if (innerException) {
            this.message += "\n" + innerException.message;
        }
    }
    return Exception;
}());
exports.Exception = Exception;
