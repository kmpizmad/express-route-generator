"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Chalk = void 0;
var Chalk = (function () {
    function Chalk() {
    }
    Chalk.writeLine = function (color, message) {
        console.log(color(message));
    };
    return Chalk;
}());
exports.Chalk = Chalk;
