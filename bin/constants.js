"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.errorCase = exports.fileName = void 0;
var path_1 = require("path");
exports.fileName = 'erg.config.js';
var errorCase = function (err, file) {
    if (err.code === 'MODULE_NOT_FOUND') {
        console.error(file, 'is missing!');
    }
    else {
        console.error(err);
    }
};
exports.errorCase = errorCase;
var loadConfig = function () {
    try {
        return require(path_1.join(process.cwd(), exports.fileName));
    }
    catch (err) {
        exports.errorCase(err, exports.fileName);
        process.exit(1);
    }
};
exports.loadConfig = loadConfig;
