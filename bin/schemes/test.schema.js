"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.testSchema = void 0;
const schemes_1 = require("../utils/schemes");
const testSchema = (name, methods) => `import supertest from "supertest";

describe('${name} test', () => {
  ${schemes_1.tests(name, methods)}
});`;
exports.testSchema = testSchema;
