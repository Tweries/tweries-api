const fetch = require('node-fetch');
const makeT = require('../makeT');
const useTweetHandler = require('./useTweetHandler');

jest.mock('../makeT');

describe('useTweetHandler', () => {
  it('response w/o error', async () => {
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

    makeT.mockImplementation(() => ({ get: jest.fn() }));

    const dictionary = { env: 'test' };

    const req = {
      app: { get: key => dictionary[key] },
      body: {
        statusId: '1200471390236766208',
        userId: 'twitter|1183836409850814464'
      }
    };

    const mockSend = jest.fn();
    const res = { send: mockSend };

    await useTweetHandler(req, res);

    expect(mockSend.mock.calls[0][0]).toMatchSnapshot({
      timestamp: expect.any(Number)
    });
  });

  it('response w/ error', async () => {
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

    makeT.mockImplementation(() => ({
      get: jest.fn(() => {
        throw new Error('Oh Noes!');
      })
    }));

    const dictionary = { env: 'test' };

    const req = {
      app: { get: key => dictionary[key] },
      body: {
        statusId: '1200471390236766208',
        userId: 'twitter|1183836409850814464'
      }
    };

    const mockSend = jest.fn();
    const res = { send: mockSend };

    await useTweetHandler(req, res);

    expect(mockSend.mock.calls[0][0]).toMatchSnapshot({
      timestamp: expect.any(Number)
    });
  });
});
