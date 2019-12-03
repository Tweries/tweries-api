const {
  matcherV2,
  mockSend,
  reqBase,
  resBase
} = require('../../handlers/mocks');
const getHealthHandler = require('./getHealthHandler');

test('getHealthHandler', () => {
  const req = { ...reqBase };
  const res = { ...resBase };

  getHealthHandler(req, res);

  expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcherV2);
});
