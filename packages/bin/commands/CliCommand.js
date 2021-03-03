"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CliCommand = void 0;
var CliCommand = (function () {
    function CliCommand(options, configLoader, schemaBuilder, files, loadConfig, exception) {
        this._options = options;
        this._configLoader = configLoader;
        this._schemaBuilder = schemaBuilder;
        this._config = this.__loadConfig(files, loadConfig, exception);
    }
    CliCommand.prototype.__loadConfig = function (arr, condition, exception) {
        return condition ? this._configLoader.load(arr, exception) : undefined;
    };
    return CliCommand;
}());
exports.CliCommand = CliCommand;
