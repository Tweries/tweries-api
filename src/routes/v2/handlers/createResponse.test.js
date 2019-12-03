const { matcherV2, reqBase } = require('../../handlers/mocks');
const createResponse = require('./createResponse');

// INFO: this is a WIP
test.skip('response', () => {
  const args = {
    data: { message: "👋 hello, I'm healty" },
    req: { ...reqBase }
  };

  expect(createResponse(args)).toMatchSnapshot(matcherV2);
});
