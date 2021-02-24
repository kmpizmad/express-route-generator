export type DefaultOptions = {
  path: string;
  filename: string;
  extension: string;
  methods: string[];
  test: boolean;
};

export type UserOptions = {
  path: string;
  filename: string;
  extension: string;
  schemesDir: string;
};

export type Config = {
  rootDir: string;
  schemesDir: string;
  methods: ('get' | 'post' | 'put' | 'patch' | 'delete' | 'options' | 'head')[];
  language: 'javascript' | 'typescript';
  test: boolean;
};

export type Add = {
  path: string;
  schemes: string;
  methods: string[];
  typescript: boolean;
  test: boolean;
};

export type Remove = {
  path: string;
  test: boolean;
};

export type List = {
  path: string;
};
