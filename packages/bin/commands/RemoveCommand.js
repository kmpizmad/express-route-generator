"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.RemoveCommand = void 0;
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../../common/errors");
var CliCommand_1 = require("./CliCommand");
var RemoveCommand = (function (_super) {
    __extends(RemoveCommand, _super);
    function RemoveCommand(name, options, configLoader, schemaBuilder, files) {
        var _this = _super.call(this, options, configLoader, schemaBuilder, files, !options.path, new errors_1.MissingParamsException('--path <path>')) || this;
        _this.__name = name;
        return _this;
    }
    RemoveCommand.prototype.run = function (callback) {
        var _a, _b;
        var path = this._options.path || ((_a = this._config) === null || _a === void 0 ? void 0 : _a.rootDir);
        var test = this._options.test || ((_b = this._config) === null || _b === void 0 ? void 0 : _b.test);
        if (path) {
            var folder = path_1.join(path, this.__name);
            if (fs_1.existsSync(folder) && fs_1.lstatSync(folder).isDirectory()) {
                this.__remove(folder, test, callback);
            }
            else {
                throw new errors_1.FileNotFoundException(folder + " is not a directory!");
            }
        }
        else {
            throw new errors_1.MissingParamsException('--path <path>');
        }
    };
    RemoveCommand.prototype.__remove = function (folder, test, callback) {
        if (test) {
            this.__removeFile(folder, callback);
        }
        else {
            this.__removeDir(folder, callback);
        }
    };
    RemoveCommand.prototype.__removeFile = function (folder, callback) {
        var filename = this.__name + '.test';
        var files = fs_1.readdirSync(folder);
        var testFile = files.filter(function (file) { return file.includes(filename); }).join('');
        var filePath = path_1.join(folder, testFile);
        if (fs_1.lstatSync(filePath).isFile()) {
            fs_1.rm(filePath, function () { return callback(filePath); });
        }
        else {
            var dotIndex = files[0].lastIndexOf('.');
            var extension = files[0].substring(dotIndex);
            throw new errors_1.FileNotFoundException("Couldn't find " + path_1.join(folder, filename + extension));
        }
    };
    RemoveCommand.prototype.__removeDir = function (folder, callback) {
        fs_1.rm(folder, { recursive: true }, function () { return callback(folder); });
    };
    return RemoveCommand;
}(CliCommand_1.CliCommand));
exports.RemoveCommand = RemoveCommand;
