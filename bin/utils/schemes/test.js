"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = void 0;
var tests = function (name, methods) {
    return methods.map(function (method) { return addTest(name, method); }).join('\n  ');
};
exports.tests = tests;
var addTest = function (name, method) {
    return "it('" + method + "', async done => {\n    const response = await supertest(server).get('/" + name + "');\n    \n    // expectations\n\n    done();\n  });";
};
