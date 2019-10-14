const express = require('express');
const { name, version } = require('../../package.json');

const router = express.Router();

// eslint-disable-next-line no-unused-vars
router.get('/', (req, res, next) => {
  res.render('index', { name, version });
});

module.exports = router;
