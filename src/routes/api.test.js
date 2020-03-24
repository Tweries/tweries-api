const api = require('./api');

test('api', () => {
  expect(api.stack).toMatchSnapshot();
});
