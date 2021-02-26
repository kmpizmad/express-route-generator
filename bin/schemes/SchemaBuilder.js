"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
var path_1 = require("path");
var _1 = require(".");
var errors_1 = require("../errors");
var FileManager_1 = require("../utils/FileManager");
var SchemaBuilder = (function () {
    function SchemaBuilder(filename, methods) {
        this.__filename = filename;
        this.__methods = methods;
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
        return "import { Router } from \"express\";\nimport { " + this.__controllers(', ', true) + " } from \"./" + this.__filename + ".handlers\";\n\nconst router = Router();\n\nrouter.route('/')." + this.__controllers('.') + ";\n\nexport default router;";
    };
    SchemaBuilder.prototype.__controllers = function (joinChar, importStatement) {
        return this.__methods
            .map(function (method) {
            return importStatement
                ? method + "Controller"
                : method + "(" + method + "Controller)";
        })
            .join(joinChar);
    };
    SchemaBuilder.prototype.__buildHandlers = function () {
        return this.__methods
            .map(function (method) {
            return "export const " + method + "Controller = async (req, res, next) => {};";
        })
            .join('\n');
    };
    SchemaBuilder.prototype.__buildTests = function () {
        return "import supertest from \"supertest\";\n\ndescribe('" + this.__filename + " test', () => {\n  " + this.__testRoutes() + "\n});";
    };
    SchemaBuilder.prototype.__testRoutes = function () {
        var _this = this;
        return this.__methods
            .map(function (method) { return "it('" + method + "', async done => {\n    const response = await supertest(server)." + method + "('/" + _this.__filename + "');\n\n    // expectations\n\n    done();\n  });"; })
            .join('\n  ');
    };
    return SchemaBuilder;
}());
exports.SchemaBuilder = SchemaBuilder;
