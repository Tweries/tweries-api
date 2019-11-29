const dictionary = { env: 'test' };

const reqBase = {
  app: { get: key => dictionary[key] }
};

const mockSend = jest.fn();
const resBase = { send: mockSend };

module.exports = { mockSend, reqBase, resBase };
