const showTweet = require('./showTweet');

test('showTweet', async () => {
  const mockGet = jest.fn(() => ({}));

  const options = {
    statusId: '1199793406886608896',
    T: { get: mockGet }
  };

  await showTweet(options);

  expect(mockGet.mock.calls[0][1]).toMatchSnapshot();
});
