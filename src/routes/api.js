const cors = require('cors');
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const getHealthHandler = require('./v2/handlers/getHealthHandler');
const useTweetHandler = require('./v2/handlers/useTweetHandler');
const useTweetstormHandler = require('./v2/handlers/useTweetstormHandler');

const { ORIGIN } = process.env;

const corsOptions = { origin: ORIGIN };

const router = express.Router();

router.get('/v2/health', cors(corsOptions), getHealthHandler);

router.use('/v2/tweet', cors(corsOptions), useTweetHandler);

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.use(
  '/v2/tweetstorm',
  cors(corsOptions),
  upload.single('cover'),
  useTweetstormHandler
);

module.exports = router;
