export const tests = (name: string, methods: string[]) =>
  methods.map(method => addTest(name, method)).join('\n  ');

const addTest = (name: string, method: string) =>
  `it('${method}', async done => {
    const response = await supertest(server).get('/${name}');
    
    // expectations

    done();
  });`;
