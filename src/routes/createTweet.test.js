const createTweet = require('./createTweet');

describe('createTweet', () => {
  const scenarios = [
    {
      description: 'new status'
    },
    {
      description: 'reply to status',
      inReplyToStatusId: '1199393733436788736'
    }
  ];

  scenarios.forEach(({ description, inReplyToStatusId }) => {
    it(description, async () => {
      const mockPost = jest.fn(() => ({}));

      const options = {
        inReplyToStatusId,
        status: 'This is my Tweet!',
        T: { post: mockPost }
      };

      await createTweet(options);

      expect(mockPost.mock.calls[0][1]).toMatchSnapshot();
    });
  });
});
