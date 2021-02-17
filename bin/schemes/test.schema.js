"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSchema = void 0;
var schemes_1 = require("../utils/schemes");
var testSchema = function (name, methods) {
    return "import supertest from \"supertest\";\n\ndescribe('" + name + " test', () => {\n  " + schemes_1.tests(name, methods) + "\n});";
};
exports.testSchema = testSchema;
