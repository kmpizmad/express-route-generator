import { tests } from '../utils/schemes';

export const testSchema = (name: string, methods: string[]) =>
  `import supertest from "supertest";

describe('${name} test', () => {
  ${tests(name, methods)}
});`;
