export interface ConfigFile {
  rootDir: string;
  schemesDir?: string;
  methods?: (
    | 'get'
    | 'getOne'
    | 'post'
    | 'put'
    | 'putOne'
    | 'patch'
    | 'patchOne'
    | 'delete'
    | 'deleteOne'
  )[];
  language?: 'javascript' | 'typescript';
  test?: boolean;
}

export interface Config {
  rootDir: string;
  schemesDir?: string;
  language?: 'javascript' | 'typescript';
  test?: boolean;
  testDir?: string;
  routes: Route[];
}

export interface Route {
  name: string;
  methods: Methods;
  test?: boolean;
}

export interface Methods {
  get?: boolean;
  getOne?: boolean;
  post?: boolean;
  put?: boolean;
  putOne?: boolean;
  patch?: boolean;
  patchOne?: boolean;
  delete?: boolean;
  deleteOne?: boolean;
}
