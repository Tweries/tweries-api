const dictionary = { env: 'test' };

const reqBase = {
  app: { get: key => dictionary[key] }
};

const mockSend = jest.fn();
const resBase = { send: mockSend };

const matcher = {
  timestamp: expect.any(Number)
};

module.exports = { matcher, mockSend, reqBase, resBase };
