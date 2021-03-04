"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SchemaBuilder = void 0;
var errors_1 = require("../errors");
var utils_1 = require("../utils");
var SchemaBuilder = (function () {
    function SchemaBuilder(fileManager) {
        this.fileManager = fileManager;
    }
    SchemaBuilder.prototype.build = function (schemes, options, callback) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                schemes.forEach(function (schema) {
                    schema.build(options.path, options.extension, callback);
                });
                return [2];
            });
        });
    };
    SchemaBuilder.prototype.buildSchema = function (name, methods) {
        this.name = name;
        this.methods = methods;
        if (methods.length === 0) {
            throw new errors_1.InvalidArgumentException('Expected \'methods\' to have at least 1 item, recieved 0.');
        }
        this.__divideMethods(methods);
        return [this.__buildRouter(), this.__buildHandlers(), this.__buildTests()];
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
