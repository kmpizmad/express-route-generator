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
exports.AddCommand = void 0;
var path_1 = require("path");
var errors_1 = require("../../common/errors");
var schemes_1 = require("../../common/schemes");
var CliCommand_1 = require("./CliCommand");
var AddCommand = (function (_super) {
    __extends(AddCommand, _super);
    function AddCommand(name, options, configLoader, schemaBuilder, files) {
        var _this = _super.call(this, options, configLoader, schemaBuilder, files, AddCommand.__isMissing(options.path, options.schemes, options.methods), AddCommand.__exception) || this;
        _this.__name = name;
        return _this;
    }
    AddCommand.prototype.run = function (callback) {
        var setup = this.__setup();
        if (setup.stillMissing) {
            if (!setup.path) {
                throw new errors_1.MissingParamsException('--path <path>');
            }
            throw new errors_1.MissingParamsException('--methods <methods...>');
        }
        if (setup.path && setup.schemes) {
            this._schemaBuilder.userBuild({
                path: setup.path,
                filename: this.__name,
                extension: setup.extension,
                schemesDir: setup.schemes,
            }, callback);
        }
        if (setup.path && setup.methods) {
            this._schemaBuilder.defaultBuild([
                new schemes_1.RouterSchema(setup.methods, this._schemaBuilder),
                new schemes_1.HandlerSchema(this.__name, setup.methods, this._schemaBuilder),
                new schemes_1.TestSchema(this.__name, setup.methods, this._schemaBuilder, setup.testFile),
            ], {
                path: path_1.join(setup.path, this.__name),
                extension: setup.extension,
            }, callback);
        }
    };
    AddCommand.prototype.__setup = function () {
        var _a, _b, _c, _d, _e, _f;
        var isTypescript = this._options.typescript || ((_a = this._config) === null || _a === void 0 ? void 0 : _a.language) === 'typescript';
        var hasTestFile = ((_b = this._config) === null || _b === void 0 ? void 0 : _b.test) !== undefined && this._options.test
            ? (_c = this._config) === null || _c === void 0 ? void 0 : _c.test
            : this._options.test;
        var path = this._options.path || ((_d = this._config) === null || _d === void 0 ? void 0 : _d.rootDir);
        var schemes = this._options.schemes || ((_e = this._config) === null || _e === void 0 ? void 0 : _e.schemesDir);
        var methods = this._options.methods || ((_f = this._config) === null || _f === void 0 ? void 0 : _f.methods);
        var extension = isTypescript ? '.ts' : '.js';
        var testFile = hasTestFile;
        var stillMissing = AddCommand.__isMissing(path, schemes, methods);
        return { path: path, schemes: schemes, methods: methods, extension: extension, testFile: testFile, stillMissing: stillMissing };
    };
    AddCommand.__exception = new errors_1.MissingParamsException('--path <path> and --methods <methods...>', new errors_1.MissingParamsException('--path <path> and --schemes <path>'));
    AddCommand.__isMissing = function (path, schemes, methods) {
        return !(AddCommand.__pathWithSchemes(path, schemes) ||
            AddCommand.__pathWithMethods(path, methods));
    };
    AddCommand.__pathWithSchemes = function (path, schemes) { return path && schemes; };
    AddCommand.__pathWithMethods = function (path, methods) { return path && methods; };
    return AddCommand;
}(CliCommand_1.CliCommand));
exports.AddCommand = AddCommand;
