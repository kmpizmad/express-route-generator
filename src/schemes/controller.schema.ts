import { controllers } from '../utils/schemes';

export const controllerSchema = (_: string, methods: string[]) =>
  `${controllers(methods)}`;
