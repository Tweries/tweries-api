const express = require('express');
const { name, version } = require('../../package.json');

const router = express.Router();

router.get('/health', (req, res, next) => {
  res.send({ message: "👋 hello, I'm healty", name, version });
});

module.exports = router;
