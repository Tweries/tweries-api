const fetch = require('node-fetch');
const { insert } = require('../../../db/index');
const makeT = require('./makeT');
const { matcherV2, mockSend, reqBase, resBase } = require('./mocks');
const useTweetstormHandler = require('./useTweetstormHandler');

const OLD_ENV = process.env;

jest.mock('../../../db/index');
jest.mock('./makeT');

describe('useTweetstormHandler', () => {
  beforeEach(() => {
    jest.resetModules();
    process.env = { ...OLD_ENV };
    delete process.env.BYPASS;

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

    mockSend.mockReset();
    makeT.mockReset();
  });

  afterEach(() => {
    process.env = OLD_ENV;
  });

  it('to match snapshot w/ error', async () => {
    insert.mockImplementation(() => ({ error: new Error('Oh Noes!') }));
    makeT.mockImplementation(() => ({
      post: () => ({ data: { id_str: 'mock_id' } })
    }));

    const req = {
      ...reqBase,
      body: {
        items: JSON.stringify([{ tweet: 'Hello #Tweries' }]),
        userId: 'twitter|1183836409850814464'
      }
    };
    const res = { ...resBase };

    await useTweetstormHandler(req, res);

    expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcherV2);
  });

  it('to match snapshot w/ result', async () => {
    insert.mockImplementation(() => ({ result: { n: 1, ok: 1 } }));
    makeT.mockImplementation(() => ({
      post: () => ({ data: { id_str: 'mock_id' } })
    }));

    const req = {
      ...reqBase,
      body: {
        items: JSON.stringify([{ tweet: 'Hello #Tweries' }]),
        userId: 'twitter|1183836409850814464'
      }
    };
    const res = { ...resBase };

    await useTweetstormHandler(req, res);

    expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcherV2);
  });

  it('BYPASS', async () => {
    process.env.BYPASS = 'true';

    const req = { ...reqBase, body: {} };
    const res = { ...resBase };

    await useTweetstormHandler(req, res);

    expect(mockSend.mock.calls[0][0]).toMatchSnapshot(matcherV2);
  });

  it('not to throw', async () => {
    makeT.mockImplementation(() => ({
      post: () => {
        throw new Error('Status is a duplicate');
      }
    }));

    const req = {
      ...reqBase,
      body: {
        items: [{ tweet: 'aaa' }, { tweet: 'bbb' }],
        userId: 'twitter|1183836409850814464'
      }
    };
    const res = { ...resBase };

    await expect(async () => {
      await useTweetstormHandler(req, res);
    }).not.toThrow();
  });
});
