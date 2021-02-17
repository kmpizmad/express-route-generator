"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("../constants");
const remove = ({ name, path }) => {
    const { rootDir } = constants_1.loadConfig();
    if (!path)
        path = rootDir;
    const folder = path_1.join(path, name);
    if (fs_1.existsSync(folder)) {
        fs_1.rm(folder, { recursive: true, force: true }, () => {
            console.log('removed', name);
        });
    }
    else {
        console.log(`didn't find folder '${name}' under ${path}`);
    }
};
exports.remove = remove;
