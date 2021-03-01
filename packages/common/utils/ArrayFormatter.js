"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ArrayFormatter = void 0;
var ArrayFormatter = (function () {
    function ArrayFormatter() {
    }
    ArrayFormatter.divide = function (arr, callback) {
        var output1 = arr.filter(function (item) { return !callback(item); });
        var output2 = arr.filter(function (item) { return callback(item); });
        return [output1, output2];
    };
    return ArrayFormatter;
}());
exports.ArrayFormatter = ArrayFormatter;
