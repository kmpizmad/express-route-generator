"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.setupCommand = void 0;
var ConfigLoader_1 = require("../ConfigLoader");
var FileManager_1 = require("../FileManager");
function setupCommand(condition, exception) {
    var config;
    if (condition) {
        config = ConfigLoader_1.ConfigLoader.load(FileManager_1.FileManager.setExtensions('erg.config', ['.js', '.json']), exception);
    }
    return config;
}
exports.setupCommand = setupCommand;
