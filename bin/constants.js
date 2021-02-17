"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loadConfig = exports.errorCase = exports.fileName = void 0;
const path_1 = require("path");
exports.fileName = 'erg.config.js';
const errorCase = (err, file) => {
    if (err.code === 'MODULE_NOT_FOUND') {
        console.error(file, 'is missing!');
    }
    else {
        console.error(err);
    }
};
exports.errorCase = errorCase;
const loadConfig = () => {
    try {
        return require(path_1.join(process.cwd(), exports.fileName));
    }
    catch (err) {
        exports.errorCase(err, exports.fileName);
        process.exit(1);
    }
};
exports.loadConfig = loadConfig;
