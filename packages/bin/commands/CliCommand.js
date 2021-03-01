"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliCommand = void 0;
var ConfigLoader_1 = require("../../common/utils/ConfigLoader");
var FileManager_1 = require("../../common/utils/FileManager");
var CliCommand = (function () {
    function CliCommand(options, loadConfig, exception) {
        this.options = options;
        this._config = this.__setupCommand(loadConfig, exception);
    }
    CliCommand.prototype.__setupCommand = function (condition, exception) {
        if (condition) {
            return ConfigLoader_1.ConfigLoader.load(FileManager_1.FileManager.setExtensions('erg.config', ['.js', '.json']), exception);
        }
        else {
            return undefined;
        }
    };
    return CliCommand;
}());
exports.CliCommand = CliCommand;
