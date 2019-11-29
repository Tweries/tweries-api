const showTweet = require('./showTweet');

test('showTweet', async () => {
  const mockGet = jest.fn(() => ({}));

  const options = {
    tweetUrl: 'https://twitter.com/trisweb/status/1200501818461212672',
    T: { get: mockGet }
  };

  await showTweet(options);

  expect(mockGet.mock.calls[0][1]).toMatchSnapshot();
});
