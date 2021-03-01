"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var module_1 = __importDefault(require("./module"));
module_1.default({
    rootDir: 'server/routes',
    routes: [
        { name: 'myRouter1', methods: { get: true, post: true } },
        {
            name: 'myRouter2',
            schemes: [
                { name: 'myRouter', text: '// Index file' },
                { name: 'handlers', text: '// Handlers file' },
            ],
        },
    ],
});
