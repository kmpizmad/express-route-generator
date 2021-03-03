"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
var _1 = require(".");
var errors_1 = require("../errors");
var utils_1 = require("../utils");
var SchemaBuilder = (function () {
    function SchemaBuilder(fileManager) {
        this.fileManager = fileManager;
    }
    SchemaBuilder.prototype.build = function (name, methods) {
        this.name = name;
        this.methods = methods;
        if (methods.length === 0) {
            throw new errors_1.InvalidArgumentException('Expected \'methods\' to have at least 1 item, recieved 0.');
        }
        this.__divideMethods(methods);
        return [this.__buildRouter(), this.__buildHandlers(), this.__buildTests()];
    };
    SchemaBuilder.prototype.userBuild = function (options, callback) {
        var path = options.path, filename = options.filename, extension = options.extension, schemesDir = options.schemesDir;
        var routerSchema = this.fileManager.readSchema(schemesDir, 'index');
        var handlerSchema = this.fileManager.readSchema(schemesDir, '.handlers');
        var testSchema = this.fileManager.readSchema(schemesDir, '.test');
        var router = new _1.Schema('index', routerSchema);
        var handlers = new _1.Schema(filename + '.handlers', handlerSchema);
        var test = new _1.Schema(filename + '.test', testSchema);
        [router, handlers, test].forEach(function (schema) {
            schema.build(path, extension, callback);
        });
    };
    SchemaBuilder.prototype.defaultBuild = function (schemes, options, callback) {
        schemes.forEach(function (schema) {
            schema.build(options.path, options.extension, callback);
        });
    };
    SchemaBuilder.prototype.__buildRouter = function () {
        var allControllers = this.methods
            .map(function (method) { return method + 'Handler'; })
            .join(', ');
        var normalControllers = this.__buildOperations(this.__normalMethods).join('.');
        var paramControllers = this.__buildOperations(this.__paramMethods).join('.');
        var imports = 'import { Router } from "express";\nimport { ' +
            allControllers +
            ' } from "./' +
            this.name +
            '.handlers";\n\n';
        var routerInstance = 'const router = Router();\n';
        var normalRouter = normalControllers
            ? 'router.route("/").' + normalControllers + ';\n'
            : '';
        var paramRouter = paramControllers
            ? 'router.route("/:id").' + paramControllers + ';\n'
            : '';
        var router = routerInstance + normalRouter + paramRouter;
        var exports = '\nexport default router;';
        return imports + router + exports;
    };
    SchemaBuilder.prototype.__buildHandlers = function () {
        return this.methods
            .map(function (method) {
            return "export const " + method + "Handler = async (req, res, next) => {};";
        })
            .join('\n');
    };
    SchemaBuilder.prototype.__buildTests = function () {
        var _this = this;
        var imports = 'import supertest from "supertest";\n\n';
        var tests = this.methods
            .map(function (method) {
            return "it(\"" + method + "\", async done => {\n\t\tconst response = await supertest(server)." + _this.__normalizeMethod(method) + "(\"/" + _this.name + "\");\n\t\t// Expectations\n\t\tdone();\n\t});";
        })
            .join('\n\t');
        var describe = "describe(\"" + this.name + " test\", () => {\n\t" + tests + "\n});";
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
        var _a = utils_1.ArrayFormatter.divide(methods, this.__addMethod), normal = _a[0], param = _a[1];
        this.__normalMethods = normal;
        this.__paramMethods = param;
    };
    SchemaBuilder.prototype.__addMethod = function (method) {
        return method.toLowerCase().includes('one');
    };
    return SchemaBuilder;
}());
exports.SchemaBuilder = SchemaBuilder;
