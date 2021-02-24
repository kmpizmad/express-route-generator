import supertest from "supertest";
      
describe('myroute3 test', () => {
  it('get', async done => {
    const response = await supertest(server).get('/myroute3');

    // expectations

    done();
  })
})