"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.imports = void 0;
const addImports = (methods) => methods.map(method => `${method}Controller`).join(', ');
const imports = (name, methods) => `import { ${addImports(methods)} } from './${name}.handlers';`;
exports.imports = imports;
