import supertest from "supertest";
      
describe('myroute2 test', () => {
  it('get', async done => {
    const response = await supertest(server).get('/myroute2');

    // expectations

    done();
  })
})