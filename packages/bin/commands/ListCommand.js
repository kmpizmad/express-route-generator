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
exports.ListCommand = void 0;
var chalk_1 = require("chalk");
var fs_1 = require("fs");
var path_1 = require("path");
var errors_1 = require("../../common/errors");
var vendors_1 = require("../../common/vendors");
var CliCommand_1 = require("./CliCommand");
var ListCommand = (function (_super) {
    __extends(ListCommand, _super);
    function ListCommand(options) {
        return _super.call(this, options, !options.path, new errors_1.MissingParamsException('--path <path>')) || this;
    }
    ListCommand.prototype.run = function () {
        var _a;
        var path = this.options.path || ((_a = this._config) === null || _a === void 0 ? void 0 : _a.rootDir);
        var recursive = this.options.recursive;
        if (path) {
            this.__list(path, recursive);
        }
    };
    ListCommand.prototype.__list = function (path, recursive) {
        var _this = this;
        if (recursive) {
            this.__recursiveListing(path, 0, function (file, ind, isDir) {
                if (ind === 0)
                    return;
                else
                    vendors_1.Chalk.writeLine(isDir ? chalk_1.yellow : chalk_1.white, _this.__createMsg(file, ind));
            });
        }
        else {
            this.__listHandler(path, function (files) {
                return vendors_1.Chalk.writeLine(chalk_1.yellow, files.join('  '));
            });
        }
    };
    ListCommand.prototype.__listHandler = function (path, callback) {
        if (fs_1.existsSync(path) && fs_1.lstatSync(path).isDirectory()) {
            callback(fs_1.readdirSync(path));
        }
        else {
            throw new errors_1.DirectoryNotFoundException("Couldn't find directory '" + path + "'.");
        }
    };
    ListCommand.prototype.__recursiveListing = function (path, indentation, callback) {
        var _this = this;
        if (fs_1.existsSync(path)) {
            if (fs_1.lstatSync(path).isDirectory()) {
                callback(path, indentation, true);
                fs_1.readdirSync(path).forEach(function (file) {
                    return _this.__recursiveListing(path_1.join(path, file), indentation + 1, callback);
                });
            }
            else {
                callback(path, indentation, false);
            }
        }
        else {
            throw new errors_1.FileNotFoundException("Couldn't find '" + path + "'.");
        }
    };
    ListCommand.prototype.__createMsg = function (filename, indentation) {
        var ind = '';
        for (var i = 0; i < indentation / 2; i++) {
            ind += ' ';
        }
        var msg = function (filename) {
            var file = filename.split(/[\\|\/]/).pop();
            return fs_1.lstatSync(filename).isDirectory() ? file : ind + '└ ' + file;
        };
        return msg(filename);
    };
    return ListCommand;
}(CliCommand_1.CliCommand));
exports.ListCommand = ListCommand;
