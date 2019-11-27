const { name, version } = require('../../../package.json');

function getHealth({ corsHandler, router }) {
  // eslint-disable-next-line no-unused-vars
  router.get('/health', corsHandler, (req, res, next) => {
    res.send({
      env: req.app.get('env'),
      message: "👋 hello, I'm healty",
      name,
      version
    });
  });
}

module.exports = getHealth; // TODO: add test
