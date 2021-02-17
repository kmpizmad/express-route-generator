"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routerSchema = void 0;
const schemes_1 = require("../utils/schemes");
const routerSchema = (name, methods) => `import { Router } from 'express';
${schemes_1.imports(name, methods)}
  
const router = Router();
  
router.route('/')${schemes_1.controllersRef(methods)};
  
export default router;`;
exports.routerSchema = routerSchema;
