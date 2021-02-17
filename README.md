# Express route generator

CLI tool to create new endpoints / routes in an Express application.

## Installation

> _npm install -g express-route-generator_

Keep in mind, that due to maintenance it's better to use it from the npm registry like this:<br/>
`npx express-route-genertor` or `npx erg` for short.

## Commands

`add | a [options] <name>` : Adds a new route under the provided path in `-p, --path <path>` option or `rootDir` field in the config file.
`remove | rm [options] <name>` : Removes a route by folder name

## Options

`add:`<br />

- -p | --path: defines the location of the server's `routes` folder
- -m | --methods: defines the HTTP methods that should be generated
- --typescript: defines the extension only (to avoid forcing predefined types on the user)
- --no-test: skips the test file

`remove:`<br />

- -p | --path: defines the location of the server's `routes` folder

All of the above can be defined though an `erg.config.js` file with these modifications:

path: `rootDir`<br />
typescript: `language` (either `javascript` or `typescript`)<br />
no-test: `test` (`true` by default)

#### Example

**Example folder structure**

```
root
└ src
  └ server
    └ db
    └ middlewares
    └ routes
    └ utils
```

**Example config file**

```
module.exports = {
  rootDir: "src/server/routes",
  methods: ["get", "post"]
}
```

**Example output** - `erg add generatedRoute`

```
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
```

**generatedRoute.handlers.js**

```
export const getController = async (req, res, next) => {};
export const postController = async (req, res, next) => {};
```

**generatedRoute.test.js**

```
import supertest from "supertest";

describe('generatedRoute test', () => {
  it('get', async done => {
    const response = await supertest(server).get('/generatedRoute');

    // expectations

    done();
  });
  it('post', async done => {
    const response = await supertest(server).get('/generatedRoute');

    // expectations

    done();
  });
});
```

**index.js**

```
import { Router } from 'express';
import { getController, postController } from './generatedRoute.handlers';

const router = Router();

router.route('/').get(getController).post(postController);

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
