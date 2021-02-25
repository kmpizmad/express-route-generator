import { SchemaBuilder } from '../../src/schemes';

const schemaBuilder = new SchemaBuilder('testRoute', ['get', 'post']);

describe('predefined builds', () => {
  it('builds router file', () => {
    const build = schemaBuilder.build('router');
    expect(build).toBe(
      `import { Router } from "express";
import { getController, postController } from "./testRoute.handlers";

const router = Router();

router.route('/').get(getController).post(postController);

export default router;`
    );
  });
  it('builds .handlers file', () => {
    const build = schemaBuilder.build('handlers');
    expect(build).toBe(
      `export const getController = async (req, res, next) => {};
export const postController = async (req, res, next) => {};`
    );
  });
  it('builds .test file', () => {
    const build = schemaBuilder.build('test');
    expect(build).toBe(
      `import supertest from "supertest";
      
describe('testRoute test', () => {
  it('get', async done => {
    const response = await supertest(server).get('/testRoute');

    // expectations

    done();
  });
  it('post', async done => {
    const response = await supertest(server).post('/testRoute');

    // expectations

    done();
  });
});`
    );
  });
});
