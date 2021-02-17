export type Config = {
  rootDir: string;
  schemesDir: string;
  language: 'javascript' | 'typescript';
  methods: ('get' | 'post' | 'put' | 'patch' | 'delete' | 'option' | 'head')[];
  test: boolean;
};

export type CommanderConfig = {
  name: string;
  path: string;
  schemes: string;
  methods: string[];
  typescript: boolean;
  test: boolean;
};

export type Result = {
  files: string[];
  schemes: string[];
};

export type Constraint = {
  position: number;
  condition: boolean;
};
