const { matcher, mockSend, reqBase, resBase } = require('./mocks');
const useTweetstormHandler = require('./useTweetstormHandler');

test.skip('useTweetstormHandler', async () => {
  const req = {
    ...reqBase,
    body: {
      items: ['Prediction is very difficult, especially about the future.'],
      replyToStatusId: '1200521619145256960',
      userId: 'twitter|1183836409850814464'
    }
  };

  const res = { ...resBase };

  await useTweetstormHandler(req, res);

  expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcher);
});
