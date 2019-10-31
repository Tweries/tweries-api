const cors = require('cors');
const debug = require('debug')('tweries-api:routes/api.js');
require('dotenv').config();
const express = require('express');
const { name, version } = require('../../package.json');
const asyncForEach = require('./asyncForEach');
const createTweet = require('./createTweet');
const getAuth0AccessToken = require('./getAuth0AccessToken');
const getTwitterTokens = require('./getTwitterTokens');

const router = express.Router();

const {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  BYPASS,
  TWITTER_API_KEY,
  TWITTER_API_SECRETE_KEY,
} = process.env;

// eslint-disable-next-line no-unused-vars
router.get('/health', cors(), (req, res, next) => {
  res.send({
    env: req.app.get('env'),
    message: "👋 hello, I'm healty",
    name,
    version,
  });
});

function send({
  data, error, items, message, req, res, userId,
}) {
  res.send({
    data,
    env: req.app.get('env'),
    error,
    items,
    message,
    name,
    userId,
    version,
  });
}

// eslint-disable-next-line no-unused-vars
router.use('/tweetstorm', cors(), async (req, res, next) => {
  const {
    body: { items, userId },
  } = req;

  if (BYPASS === 'true') {
    debug('BYPASS');
  } else {
    const auth0AccessToken = await getAuth0AccessToken({
      clientId: AUTH0_CLIENT_ID,
      clientSecret: AUTH0_CLIENT_SECRET,
      domain: AUTH0_DOMAIN,
    });

    const {
      accessToken: twitterAccessToken,
      accessTokenSecret: twitterAccessTokenSecret,
    } = await getTwitterTokens({
      auth0AccessToken,
      domain: AUTH0_DOMAIN,
      userId,
    });

    let inReplyToStatusId = null;
    await asyncForEach(items, async (item) => {
      const tweet = await createTweet({
        accessToken: twitterAccessToken,
        accessTokenSecret: twitterAccessTokenSecret,
        consumerKey: TWITTER_API_KEY,
        consumerSecret: TWITTER_API_SECRETE_KEY,
        inReplyToStatusId,
        status: item.tweet,
      });
      inReplyToStatusId = tweet.data.id_str;
    });
  }

  send({
    data: null,
    error: null,
    items,
    message: '👌',
    req,
    res,
    userId,
  });
});

module.exports = router;
