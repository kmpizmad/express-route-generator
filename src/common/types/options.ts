export interface AddOptions {
  path: string;
  schemes: string;
  methods: string[];
  typescript: boolean;
  test: boolean;
}

export interface RemoveOptions {
  path: string;
  test: boolean;
}

export interface ListOptions {
  path: string;
  recursive: boolean;
}

export interface DefaultOptions {
  path: string;
  extension: string;
}

export interface UserOptions {
  path: string;
  filename: string;
  extension: string;
  schemesDir: string;
}
