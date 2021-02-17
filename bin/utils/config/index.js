"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommand = void 0;
const fs_1 = require("fs");
const path_1 = require("path");
const constants_1 = require("../../constants");
const setupCommand = (commanderConfig) => {
    const { rootDir, schemesDir, language, test: addTest, methods: defaultMethods, } = constants_1.loadConfig();
    let extension;
    if (!commanderConfig.path)
        commanderConfig.path = rootDir;
    if (!commanderConfig.schemes)
        commanderConfig.schemes = schemesDir;
    if (!commanderConfig.methods)
        commanderConfig.methods = defaultMethods;
    if (!commanderConfig.typescript || language === 'javascript')
        extension = 'js';
    else
        extension = 'ts';
    if (!commanderConfig.test)
        commanderConfig.test = addTest || true;
    if (commanderConfig.methods && commanderConfig.methods.length > 0)
        commanderConfig.methods.forEach((method) => method.toLowerCase());
    else
        return console.error(`please provide the -m, --methods <methods...> option or "methods" field in ${constants_1.fileName}!`);
    if (!fs_1.existsSync(commanderConfig.path))
        fs_1.mkdirSync(commanderConfig.path);
    const folder = path_1.join(commanderConfig.path, commanderConfig.name);
    if (!fs_1.existsSync(folder))
        fs_1.mkdirSync(folder);
    return Object.assign(Object.assign({}, commanderConfig), { extension, folder });
};
exports.setupCommand = setupCommand;
