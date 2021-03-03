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
exports.RouterSchema = void 0;
var Schema_1 = require("./Schema");
var RouterSchema = (function (_super) {
    __extends(RouterSchema, _super);
    function RouterSchema(methods, schemaBuilder) {
        var _this = this;
        var router = schemaBuilder.build('index', methods)[0];
        _this = _super.call(this, 'index', router) || this;
        return _this;
    }
    return RouterSchema;
}(Schema_1.Schema));
exports.RouterSchema = RouterSchema;
