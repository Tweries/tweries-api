const getHealthHandler = require('./getHealthHandler');
const { mockSend, reqBase, resBase } = require('./mocks');

test('getHealthHandler', () => {
  const req = { ...reqBase };
  const res = { ...resBase };

  getHealthHandler(req, res);

  expect(mockSend.mock.calls[0][0]).toMatchSnapshot();
});
