const cors = require('cors');
require('dotenv').config();
const express = require('express');
const getHealthHandler = require('./handlers/getHealthHandler');
const useTweetHandler = require('./handlers/useTweetHandler');
const useTweetstormHandler = require('./handlers/useTweetstormHandler');

const router = express.Router();

const { ORIGIN } = process.env;

const corsOptions = { origin: ORIGIN };

router.get('/health', cors(corsOptions), getHealthHandler);

router.use('/tweet', cors(corsOptions), useTweetHandler);

router.use('/tweetstorm', cors(corsOptions), useTweetstormHandler);

module.exports = router;
