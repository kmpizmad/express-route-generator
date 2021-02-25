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
exports.TestSchema = void 0;
var Schema_1 = require("./Schema");
var SchemaBuilder_1 = require("./SchemaBuilder");
var TestSchema = (function (_super) {
    __extends(TestSchema, _super);
    function TestSchema(filename, methods, condition) {
        var _this = this;
        var schemaBuilder = new SchemaBuilder_1.SchemaBuilder(filename, methods);
        _this = _super.call(this, filename + '.test', schemaBuilder.build('tests')) || this;
        _this.__condition = condition;
        return _this;
    }
    TestSchema.prototype.build = function (path, extension, testing) {
        if (this.__condition) {
            _super.prototype.build.call(this, path, extension, testing);
        }
    };
    return TestSchema;
}(Schema_1.Schema));
exports.TestSchema = TestSchema;
