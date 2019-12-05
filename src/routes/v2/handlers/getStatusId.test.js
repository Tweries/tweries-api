const getStatusId = require('./getStatusId');

describe('getStatusId', () => {
  const scenarios = [
    {
      description: 'empty',
      expected: '',
      tweetUrl: ''
    },
    {
      description: 'legit',
      expected: '1199474666412236800',
      tweetUrl: 'https://twitter.com/musk_china/status/1199474666412236800'
    },
    {
      description: 'null',
      expected: null,
      tweetUrl: null
    },
    {
      description: 'undefined',
      expected: undefined,
      tweetUrl: undefined
    }
  ];

  scenarios.forEach(({ description, expected, tweetUrl }) => {
    it(description, () => {
      const statusId = getStatusId(tweetUrl);
      expect(statusId).toEqual(expected);
    });
  });
});
