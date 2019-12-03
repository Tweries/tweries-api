const createResponse = require('./createResponse');

// eslint-disable-next-line no-unused-vars
function getHealthHandler(req, res, next) {
  const response = createResponse({
    data: { message: "👋 hello, I'm healty" },
    req
  });
  res.send(response);
}

module.exports = getHealthHandler;
