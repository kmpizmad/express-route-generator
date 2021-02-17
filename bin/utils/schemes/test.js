"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.tests = void 0;
const tests = (name, methods) => methods.map(method => addTest(name, method)).join('\n  ');
exports.tests = tests;
const addTest = (name, method) => `it('${method}', async done => {
    const response = await supertest(server).get('/${name}');
    
    // expectations

    done();
  });`;
