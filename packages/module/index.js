"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
function default_1(config) {
    if (!fs_1.existsSync(config.rootDir)) {
        fs_1.mkdirSync(config.rootDir, { recursive: true });
    }
}
exports.default = default_1;
