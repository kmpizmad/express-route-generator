import { controllersRef, imports } from '../utils/schemes';

export const routerSchema = (name: string, methods: string[]) =>
  `import { Router } from 'express';
${imports(name, methods)}
  
const router = Router();
  
router.route('/')${controllersRef(methods)};
  
export default router;`;
