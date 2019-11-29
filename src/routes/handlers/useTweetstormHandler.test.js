const { matcher, mockSend, reqBase, resBase } = require('../mocks');
const useTweetstormHandler = require('./useTweetstormHandler');

test('useTweetstormHandler', async () => {
  const req = {
    ...reqBase,
    body: {
      items: ['TODO'],
      userId: 'twitter|1183836409850814464'
    }
  };

  const res = { ...resBase };

  await useTweetstormHandler(req, res);

  expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcher);
});
