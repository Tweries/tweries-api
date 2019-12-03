const { matcherV2, reqBase } = require('../../handlers/mocks');
const createResponse = require('./createResponse');

test('response', () => {
  const args = {
    data: { message: "👋 hello, I'm healty" },
    req: { ...reqBase }
  };

  expect(createResponse(args)).toMatchSnapshot(matcherV2);
});
