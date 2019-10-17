const cors = require('cors');
require('dotenv').config();
const express = require('express');
const { name, version } = require('../../package.json');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/health', cors(), (req, res, next) => {
  res.send({ message: "👋 hello, I'm healty", name, version });
});

function send({
  data, error, items, res, userId,
}) {
  res.send({
    data,
    error,
    items,
    message: 'WIP',
    name,
    userId,
    version,
  });
}

// eslint-disable-next-line no-unused-vars
router.use('/tweetstorm', cors(), ({ body: { items, userId } }, res, next) => {
  send({
    data: null,
    error: null,
    items,
    res,
    userId,
  });
});

module.exports = router;
