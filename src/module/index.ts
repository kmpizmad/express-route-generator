// Import { green } from 'chalk';
// // Import { Application } from 'express';
// Import { existsSync, mkdirSync, writeFile } from 'fs';
// Import { join, normalize } from 'path';
// Import { SchemaBuilder } from '../common/schemes';
// Import { Config } from '../common/types';

// // Const cfg: Config = {
// //   RootDir: 'server/routes',
// //   Routes: [
// //     { name: 'myroute', methods: { get: true } },
// //     { name: 'myroute2', methods: { get: true, post: true } },
// //     {
// //       Name: 'myroute3',
// //       Schemes: [
// //         { name: 'index', text: '' },
// //         { name: 'myHandlers.handlers', text: '' },
// //         { name: 'myHandlers.test', text: '' },
// //       ],
// //     },
// //   ],
// // };

// Export default function (config: Config): void {
//   // TODO: Runs config and compares to structure
//   Const routesFolder = normalize(config.rootDir);
//   Const extension = config.language === 'typescript' ? '.ts' : '.js';

//   If (!existsSync(routesFolder)) {
//     MkdirSync(routesFolder, { recursive: true });
//   }

//   Config.routes.forEach(route => {
//     Const hasSchemes = route.schemes && route.schemes.length > 0;
//     Const hasMethods =
//       Route.methods && Object.getOwnPropertyNames(route.methods).length > 0;

//     If (hasSchemes) {
//       Const path = join(routesFolder, route.name);

//       If (!existsSync(path)) {
//         MkdirSync(path, { recursive: true });
//       }

//       Route.schemes?.forEach(schema => {
//         Const file = join(path, schema.name + extension);
//         WriteFile(file, schema.text, Chalk.log(green, `created ${path}`));
//       });
//     } else if (hasMethods) {
//       Const methods = Object.getOwnPropertyNames(route.methods).filter(
//         Method => (route.methods as never)[method]
//       );

//       SchemaBuilder.defaultBuild({
//         Path: routesFolder,
//         Extension,
//         Filename: route.name,
//         Methods,
//         Test: route.test || true,
//       });
//     } else {
//       // Throw error
//     }
//   });

//   // Return (app: Application) => {

//   // };
// }

// // * Creates 'routes' folder
// // * Creates index file which contains every route
// // *  Eg. app.use('/users', require('./users'))
// // * Wires every route to the Express app
