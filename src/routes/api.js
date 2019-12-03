const cors = require('cors');
require('dotenv').config();
const express = require('express');
const getHealthHandler = require('./handlers/getHealthHandler');
const getHealthHandlerV2 = require('./v2/handlers/getHealthHandler');
const useTweetHandler = require('./handlers/useTweetHandler');
const useTweetstormHandler = require('./handlers/useTweetstormHandler');

const router = express.Router();

const { ORIGIN } = process.env;

const corsOptions = { origin: ORIGIN };

router.get('/v1/health', cors(corsOptions), getHealthHandler);

router.get('/v2/health', cors(corsOptions), getHealthHandlerV2);

router.use('/v1/tweet', cors(corsOptions), useTweetHandler);

router.use('/v1/tweetstorm', cors(corsOptions), useTweetstormHandler);

module.exports = router;
