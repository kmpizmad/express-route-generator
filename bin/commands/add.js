"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.add = void 0;
const schemes_1 = require("../schemes");
const utils_1 = require("../utils");
const config_1 = require("../utils/config");
const schemes_2 = require("../utils/schemes");
const add = (commanderConfig) => {
    const { folder, schemes: schemesDir, extension, name, methods, test, } = config_1.setupCommand(commanderConfig);
    const [userFiles, userSchemes] = schemesDir ? schemes_2.loadSchemes(schemesDir) : [];
    const files = userFiles
        ? utils_1.joinFiles(folder, ...utils_1.renameFiles(name, ...userFiles).map(file => file + '.' + extension))
        : utils_1.joinFiles(folder, `index.${extension}`, `${name}.handlers.${extension}`, `${name}.test.${extension}`);
    const schemes = userSchemes || [
        schemes_1.routerSchema(name, methods),
        schemes_1.controllerSchema(name, methods),
        schemes_1.testSchema(name, methods),
    ];
    utils_1.generate({ files, schemes }, { position: files.length - 1, condition: test });
};
exports.add = add;
