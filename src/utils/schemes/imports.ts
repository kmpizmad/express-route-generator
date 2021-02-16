const addImports = (methods: string[]) =>
  methods.map(method => `${method}Controller`).join(', ');

export const imports = (name: string, methods: string[]) =>
  `import { ${addImports(methods)} } from './${name}.handlers';`;
