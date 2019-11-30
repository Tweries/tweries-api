const api = require('./api');

test('api', () => {
  expect(api).toMatchSnapshot();
});
