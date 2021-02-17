"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateLoop = exports.generate = exports.joinFiles = exports.renameFiles = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const renameFiles = (name, ...args) => {
    const files = args.filter(arg => arg.includes('.'));
    const unchanged = args.filter(arg => !arg.includes('.'));
    const renamed = files.map(file => {
        const idx = file.indexOf('.');
        const substr = file.substring(idx);
        return name + substr;
    });
    return [...unchanged, ...renamed];
};
exports.renameFiles = renameFiles;
const joinFiles = (folder, ...args) => {
    let output = [];
    args.forEach(arg => output.push(path_1.join(folder, arg)));
    return output;
};
exports.joinFiles = joinFiles;
const generate = ({ files, schemes }, { condition, position }) => {
    const tempFiles = files;
    const tempSchemes = schemes;
    const conditionalFiles = tempFiles.splice(position, 1);
    const conditionalSchemes = tempSchemes.splice(position, 1);
    exports.generateLoop({ files: tempFiles, schemes: tempSchemes });
    if (condition)
        exports.generateLoop({ files: conditionalFiles, schemes: conditionalSchemes });
};
exports.generate = generate;
const generateLoop = ({ files, schemes }) => schemes.forEach((schema, i) => fs_1.writeFile(files[i], schema, () => console.log('created', files[i])));
exports.generateLoop = generateLoop;
