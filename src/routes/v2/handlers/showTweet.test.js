const showTweet = require('./showTweet');

test('showTweet', async () => {
  const mockGet = jest.fn(() => ({}));

  const options = {
    tweetUrl: 'https://twitter.com/musk_china/status/1199474666412236800',
    T: { get: mockGet }
  };

  await showTweet(options);

  expect(mockGet.mock.calls[0][1]).toMatchSnapshot();
});
