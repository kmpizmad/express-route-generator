"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Exception = void 0;
var chalk_1 = require("chalk");
var Exception = (function () {
    function Exception(message, exception) {
        this.message = chalk_1.red(this.constructor.name + ':') + " " + message;
        this._exception = exception;
    }
    Exception.prototype.throw = function () {
        console.log(this.message, this._exception ? this._exception.message : '');
        process.exit(1);
    };
    return Exception;
}());
exports.Exception = Exception;
