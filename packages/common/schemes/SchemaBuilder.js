"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
var path_1 = require("path");
var _1 = require(".");
var errors_1 = require("../errors");
var ArrayFormatter_1 = require("../utils/ArrayFormatter");
var FileManager_1 = require("../utils/FileManager");
var SchemaBuilder = (function () {
    function SchemaBuilder(name, methods) {
        this.__name = name;
        this.__methods = methods;
        this.__divideMethods(methods);
    }
    SchemaBuilder.prototype.build = function (name) {
        switch (name) {
            case 'index':
            case 'route':
            case 'router':
            case 'endpoint':
                return this.__buildRouter();
            case 'handler':
            case 'handlers':
            case 'operation':
            case 'operations':
            case 'method':
            case 'methods':
                return this.__buildHandlers();
            case 'test':
            case 'tests':
            case 'spec':
            case 'specs':
                return this.__buildTests();
            default:
                throw new errors_1.InvalidArgumentException("Couldn't recognize build pattern '" + name + "'");
        }
    };
    SchemaBuilder.userBuild = function (options) {
        var path = options.path, filename = options.filename, extension = options.extension, schemesDir = options.schemesDir;
        var routerSchema = FileManager_1.FileManager.readSchema(schemesDir, 'index');
        var handlerSchema = FileManager_1.FileManager.readSchema(schemesDir, '.handlers');
        var testSchema = FileManager_1.FileManager.readSchema(schemesDir, '.test');
        var router = new _1.Schema('index', routerSchema);
        var handlers = new _1.Schema(filename + '.handlers', handlerSchema);
        var test = new _1.Schema(filename + '.test', testSchema);
        [router, handlers, test].forEach(function (schema) {
            var folder = path_1.join(path, filename);
            schema.build(folder, extension);
        });
    };
    SchemaBuilder.defaultBuild = function (options) {
        var path = options.path, filename = options.filename, extension = options.extension, methods = options.methods, test = options.test;
        var routerSchema = new _1.RouterSchema(filename, methods);
        var handlerSchema = new _1.HandlerSchema(filename, methods);
        var testSchema = new _1.TestSchema(filename, methods, test);
        var schemes = [routerSchema, handlerSchema, testSchema];
        schemes.forEach(function (schema) {
            var folder = path_1.join(path, filename);
            schema.build(folder, extension);
        });
    };
    SchemaBuilder.prototype.__buildRouter = function () {
        var allControllers = this.__methods
            .map(function (method) { return method + 'Handler'; })
            .join(', ');
        var normalControllers = this.__buildOperations(this.__normalMethods).join('.');
        var paramControllers = this.__buildOperations(this.__paramMethods).join('.');
        var imports = 'import { Router } from "express";\nimport { ' +
            allControllers +
            ' } from "./' +
            this.__name +
            '.handlers";\n\n';
        var routerInstance = 'const router = Router();\n';
        var normalRouter = !!normalControllers
            ? 'router.route("/").' + normalControllers + ';\n'
            : '';
        var paramRouter = !!paramControllers
            ? 'router.route("/:id").' + paramControllers + ';\n'
            : '';
        var router = routerInstance + normalRouter + paramRouter;
        var exports = '\nexport default router;';
        return imports + router + exports;
    };
    SchemaBuilder.prototype.__buildHandlers = function () {
        return this.__methods
            .map(function (method) {
            return "export const " + method + "Handler = async (req, res, next) => {};";
        })
            .join('\n');
    };
    SchemaBuilder.prototype.__buildTests = function () {
        var _this = this;
        var imports = 'import supertest from "supertest";\n\n';
        var tests = this.__methods
            .map(function (method) {
            return "it(\"" + method + "\", async done => {\n\t\tconst response = await supertest(server)." + _this.__normalizeMethod(method) + "(\"/" + _this.__name + "\");\n\t\t// Expectations\n\t\tdone();\n\t});";
        })
            .join('\n\t');
        var describe = "describe(\"" + this.__name + " test\", () => {\n\t" + tests + "\n});";
        return imports + describe;
    };
    SchemaBuilder.prototype.__buildOperations = function (methods) {
        var _this = this;
        return methods.map(function (method) { return _this.__normalizeMethod(method) + "(" + method + "Handler)"; });
    };
    SchemaBuilder.prototype.__normalizeMethod = function (method) {
        return method.toLowerCase().includes('one')
            ? method.substring(0, method.length - 3)
            : method;
    };
    SchemaBuilder.prototype.__divideMethods = function (methods) {
        var _a = ArrayFormatter_1.ArrayFormatter.divide(methods, this.__addMethod), normal = _a[0], param = _a[1];
        this.__normalMethods = normal;
        this.__paramMethods = param;
    };
    SchemaBuilder.prototype.__addMethod = function (method) {
        return method.toLowerCase().includes('one');
    };
    return SchemaBuilder;
}());
exports.SchemaBuilder = SchemaBuilder;
