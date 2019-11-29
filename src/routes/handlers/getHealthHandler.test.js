const { mockSend, reqBase, resBase } = require('../mocks');
const getHealthHandler = require('./getHealthHandler');

test('getHealthHandler', () => {
  const req = { ...reqBase };
  const res = { ...resBase };

  getHealthHandler(req, res);

  expect(mockSend.mock.calls[0][0]).toMatchSnapshot();
});
