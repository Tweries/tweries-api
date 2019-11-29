const fetch = require('node-fetch');
const makeT = require('./makeT');
const { matcher, mockSend, reqBase, resBase, tweet } = require('./mocks');
const useTweetHandler = require('./useTweetHandler');

jest.mock('./makeT');

const req = {
  ...reqBase,
  body: {
    tweetUrl: 'https://twitter.com/musk_china/status/1199474666412236800',
    userId: 'twitter|1183836409850814464'
  }
};

const res = { ...resBase };

describe('useTweetHandler', () => {
  beforeEach(() => {
    fetch.mockResponses(
      [
        JSON.stringify({ access_token: 'mock_access_token' }),
        { status: '200' }
      ],
      [
        JSON.stringify({
          identities: [
            {
              access_token: 'mock_access_token',
              access_token_secret: 'mock_access_token_secret',
              provider: 'twitter'
            }
          ]
        }),
        { status: 200 }
      ]
    );

    res.send.mockReset();
  });

  it('response w/o error', async () => {
    makeT.mockImplementation(() => ({ get: jest.fn(() => ({ data: tweet })) }));

    await useTweetHandler(req, res);

    expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcher);
  });

  it('response w/ error', async () => {
    makeT.mockImplementation(() => ({
      get: jest.fn(() => {
        throw new Error('Oh Noes!');
      })
    }));

    await useTweetHandler(req, res);

    expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcher);
  });
});
