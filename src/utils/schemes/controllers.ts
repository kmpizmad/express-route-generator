export const controllers = (methods: string[]) =>
  methods.map(method => addController(method)).join('\n');
export const controllersRef = (methods: string[]) =>
  methods.map(method => addControllerRef(method)).join('');

const addController = (method: string) =>
  `export const ${method}Controller = async (req, res, next) => {};`;
const addControllerRef = (method: string) => `.${method}(${method}Controller)`;
