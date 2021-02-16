# Express route generator

CLI tool to create new endpoints / routes in an Express application.

## Installation

`npm install -g express-route-generator`

## Usage

`express-route-generator add myRoute --path server/routes --methods get post`

**OR**

`erg add myRoute --path server/routes --methods get post`

## Commands

`add | a [options] <name>` : Adds a new route under the provided path in `-p, --path <path>` option or `rootDir` field in the config file.
`remove | rm [options] <name>` : Removes a route by folder name

## Config

Configuration can be defined through an `erg.config.js` file or in the options.

**Options**

`rootDir:` directory that holds all of the routes

`extension:` `js` or `ts`

`methods:` provided methods will be generated in every route

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
