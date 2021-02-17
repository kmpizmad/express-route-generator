"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSchema = void 0;
var schemes_1 = require("../utils/schemes");
var routerSchema = function (name, methods) {
    return "import { Router } from 'express';\n" + schemes_1.imports(name, methods) + "\n  \nconst router = Router();\n  \nrouter.route('/')" + schemes_1.controllersRef(methods) + ";\n  \nexport default router;";
};
exports.routerSchema = routerSchema;
