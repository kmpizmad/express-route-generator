import { existsSync, mkdirSync } from 'fs';
import { Config } from '../common/types';

// const cfg: Config = {
//   rootDir: 'server/routes',
//   routes: [
//     { name: 'myroute', methods: { get: true } },
//     { name: 'myroute2', methods: { get: true, post: true } },
//     { name: 'myroute3', methods: { get: true, getOne: true } },
//   ],
// };

export default function (config: Config) {
  // TODO: Runs config and compares to structure

  if (!existsSync(config.rootDir)) {
    mkdirSync(config.rootDir, { recursive: true });
  }
}

// * Creates 'routes' folder
// * Creates index file which contains every route
// *  eg. app.use('/users', require('./users'))
// * Wires every route to the Express app
