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

export interface BuildOptions {
  path: string;
  extension: string;
}
