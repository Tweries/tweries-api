const { name, version } = require('../../../package.json');

// eslint-disable-next-line no-unused-vars
function getHealthHandler(req, res, next) {
  res.send({
    env: req.app.get('env'),
    message: "👋 hello, I'm healty",
    name,
    version
  });
}

module.exports = getHealthHandler; // TODO: add test
