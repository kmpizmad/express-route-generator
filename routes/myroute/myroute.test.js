import supertest from "supertest";
      
describe('myroute test', () => {
  it('get', async done => {
    const response = await supertest(server).get('/myroute');

    // expectations

    done();
  })
})