[![npm][npm-version]][npm-url]
[![npm][npm-downloads]][npm-url]
[![Coverage Status][coveralls-badge]][coveralls-url]
[![Build Status][travis-badge]][travis-url]
[![GitHub last commit][github-last-commit]][github-url]
[![Depfu][depfu-badge]][depfu-url]

# Table of Contents

- [Express route generator](#express-route-generator)
  - [Installation](#installation)
  - [Commands](#commands)
  - [Options](#options)
    - [Options Reference](#options-reference)
  - [Configuration](#configuration)
    - [Configuration Reference](#configuration-reference)
  - [Custom Schemes](#custom-schemes)
  - [Examples](#examples)
  - [License](#license)

# Express route generator

CLI tool to create new endpoints / routes in an Express application.

## Installation

> _npm install -g @kmpizmad/express-route-generator_

Keep in mind, that due to maintenance it's better to use it from the npm registry like this:<br/>
`npx @kmpizmad/express-route-genertor`

## Commands

`add | a [options] <name>:` adds a new route under the provided path<br />
`remove | rm [options] <name>:` removes a route by folder name<br />
`list | ls [options]:` lists all routes

## Options

**add:**<br />

[`-p, --path` [string]](#rootdir-string)<br />
[`-s, --schemes` [string]](#schemesdir-string)<br />
[`--typescript` [string]](#language-string)<br />
[`--no-test` [boolean]](#test-boolean)<br />
[`-m, --methods` [array<string>]](#methods-array)

**remove:**<br />

[`-p, --path` [string]](#rootdir-string)<br />
[`-t, --test` [boolean]](#-t---test-boolean)

**list:**

[`-p, --path` [string]](#rootdir-string)<br />
[`-r, --recursive` [boolean]](#-r---recursive-boolean)

**All of the above can be defined though an `erg.config.js` or `erg.config.json` file**

### Options Reference

##### `-t, --test` [boolean]

Default: `false`

Removes the test file only.

Example:

```
// erg rm myRoute --test

routes
└ myRoute
  └ index.js
  └ myRoute.handlers.js
```

##### `-r, --recursive` [boolean]

Default: `false`

Recursively lists every route.

Example:

```
myRoute
  └ index.js
  └ myRoute.handlers.js
  └ myRoute.test.js
myRoute2
  └ index.js
  └ myRoute2.handlers.js
  └ myRoute2.test.js
myRoute3
  └ index.js
  └ myRoute3.handlers.js
  └ myRoute3.test.js
```

## Configuration

[`rootDir` [string]](#rootdir-string)<br />
[`schemesDir` [string]](#schemesdir-string)<br />
[`language` [string]](#language-string)<br />
[`test` [boolean]](#test-boolean)<br />
[`methods` [array]](#methods-array)

### Configuration Reference

##### `rootDir` [string]

Default: `undefined`

Path to the folder where the routes are stored. Equivalent of `-p, --path <path>`.

Examples:

- `rootDir: ./server/routes`
- `rootDir: ./server/api/endpoints`

##### `schemesDir` [string]

Default: `undefined`

Path to the folder where the custom schemes are stored. Equivalent of `-s, --schemes <path>`.

Examples:

- `schemesDir: ./schemes`
- `schemesDir: ./server/routes/schemes`

##### `language` [string]

Default: `javascript`

Defines the extension of the files. Equivalent of `--typescript`.

Available values:

- `javascript`
- `typescript`

Example:

```
// language: 'javascript'

routes
└ myRoute
  └ index.js
  └ myRoute.handlers.js
  └ myRoute.test.js
```

##### `test` [boolean]

Default: `true`

Defines if a test file should be generated. Equivalent of `--no-test`.

Example:

```
// test: false

routes
└ myRoute
  └ index.js
  └ myRoute.handlers.js
```

##### `methods` [array<string>]

Default: `undefined`

Defines what methods should be handled by the router. Equivalent of `-m, --methods <methods...>`.

Available values:

- `get`
- `getOne`
- `post`
- `put`
- `putOne`
- `patch`
- `patchOne`
- `delete`
- `deleteOne`

```
// methods: ['get', 'getOne']

routes
└ myRoute
  └ index.js
  └ myRoute.handlers.js
```

## Custom Schemes

**ERG** provides an opportunity to create your own schemes. The location must be defined otherwise it'll use the built-in schemes.

**Filenames must contain the follows:**

`index`: This will be the router<br />
`.handlers`: This will contain the handlers for the router<br />
`.test`: This will be the test

Prefixing and suffixing is doable, because the result will always start with the route name and end with the extension.

```
// Example - erg add testRouter --path routes --schemes mySchemes

mySchemes
└ sample.index.ts
└ sample.handlers.ts
└ sample.test.ts
```

```
// Result

routes
└ testRouter
  └ index.js
  └ testRouter.handlers.js
  └ testRouter.test.js
```

## Examples

```
// Example structure

root
└ src
  └ server
  └ db
  └ middlewares
  └ routes
  └ utils
```

```
// Example config

module.exports = {
  rootDir: "src/server/routes",
  methods: ["get", "getOne"]
}
```

```
// Example output of 'erg add generatedRoute'

root
└ src
  └ server
  └ db
  └ middlewares
  └ routes
    └ generatedRoute
      └ generatedRoute.handlers.js
      └ generatedRoute.test.js
      └ index.js
  └ utils

// generatedRoute.handlers.js

export const getHandler = async (req, res, next) => {};
export const getOneHandler = async (req, res, next) => {};

// generatedRoute.test.js

import supertest from "supertest";

describe('generatedRoute test', () => {
  it('get', async done => {
    const response = await supertest(server).get('/generatedRoute');
    // Expectations
    done();
  });
  it('getOne', async done => {
    const response = await supertest(server).get('/generatedRoute');
    // Expectations
    done();
  });
});

// index.js

import { Router } from 'express';
import { getHandler, getOneHandler } from './generatedRoute.handlers';

const router = Router();
router.route("/").get(getHandler)
router.route("/:id").get(getOneHandler);

export default router;
```

## License

MIT License

Copyright (c) 2021 Viktor Nagy

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.

[npm-url]: https://www.npmjs.com/package/@kmpizmad/express-route-generator
[npm-version]: https://img.shields.io/npm/v/@kmpizmad/express-route-generator?color=success&logo=npm
[npm-downloads]: https://img.shields.io/npm/dm/@kmpizmad/express-route-generator?color=critical&logo=npm
[coveralls-badge]: https://coveralls.io/repos/github/kmpizmad/express-route-generator/badge.svg
[coveralls-url]: https://coveralls.io/github/kmpizmad/express-route-generator
[travis-badge]: https://travis-ci.com/kmpizmad/express-route-generator.svg
[travis-url]: https://travis-ci.com/github/kmpizmad/express-route-generator
[github-url]: https://github.com/kmpizmad/express-route-generator
[github-last-commit]: https://img.shields.io/github/last-commit/kmpizmad/express-route-generator?color=orange&logo=GitHub
[depfu-badge]: https://badges.depfu.com/badges/f2e2a7e25d2f85036822a4e39eab2117/overview.svg
[depfu-url]: https://depfu.com/github/kmpizmad/express-route-generator?project_id=22715
