const cors = require('cors');
require('dotenv').config();
const express = require('express');
const getHealthHandler = require('./v2/handlers/getHealthHandler');
const useTweetHandler = require('./v2/handlers/useTweetHandler');
const useTweetstormHandler = require('./v2/handlers/useTweetstormHandler');

const router = express.Router();

const { ORIGIN } = process.env;

const corsOptions = { origin: ORIGIN };

router.get('/v2/health', cors(corsOptions), getHealthHandler);

router.use('/v2/tweet', cors(corsOptions), useTweetHandler);

router.use('/v2/tweetstorm', cors(corsOptions), useTweetstormHandler);

module.exports = router;
