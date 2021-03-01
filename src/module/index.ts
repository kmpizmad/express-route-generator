import { green } from 'chalk';
// import { Application } from 'express';
import { existsSync, mkdirSync, writeFile } from 'fs';
import { join, normalize } from 'path';
import { SchemaBuilder } from '../common/schemes';
import { Config } from '../common/types';
import { Chalk } from '../common/vendors';

// const cfg: Config = {
//   rootDir: 'server/routes',
//   routes: [
//     { name: 'myroute', methods: { get: true } },
//     { name: 'myroute2', methods: { get: true, post: true } },
//     {
//       name: 'myroute3',
//       schemes: [
//         { name: 'index', text: '' },
//         { name: 'myHandlers.handlers', text: '' },
//         { name: 'myHandlers.test', text: '' },
//       ],
//     },
//   ],
// };

export default function (config: Config) {
  // TODO: Runs config and compares to structure
  const routesFolder = normalize(config.rootDir);
  const extension = config.language === 'typescript' ? '.ts' : '.js';

  if (!existsSync(routesFolder)) {
    mkdirSync(routesFolder, { recursive: true });
  }

  config.routes.forEach(route => {
    const hasSchemes = route.schemes && route.schemes.length > 0;
    const hasMethods =
      route.methods && Object.getOwnPropertyNames(route.methods).length > 0;

    if (hasSchemes) {
      const path = join(routesFolder, route.name);

      if (!existsSync(path)) {
        mkdirSync(path, { recursive: true });
      }

      route.schemes!.forEach(schema => {
        const file = join(path, schema.name + extension);
        writeFile(file, schema.text, Chalk.log(green, `created ${path}`));
      });
    } else if (hasMethods) {
      const methods = Object.getOwnPropertyNames(route.methods).filter(
        method => (route.methods as any)[method]
      );

      SchemaBuilder.defaultBuild({
        path: routesFolder,
        extension,
        filename: route.name,
        methods,
        test: route.test || true,
      });
    } else {
      // throw error
    }
  });

  // return (app: Application) => {

  // };
}

// * Creates 'routes' folder
// * Creates index file which contains every route
// *  eg. app.use('/users', require('./users'))
// * Wires every route to the Express app
