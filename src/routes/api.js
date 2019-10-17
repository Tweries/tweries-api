const cors = require('cors');
require('dotenv').config();
const express = require('express');
const { name, version } = require('../../package.json');
const createTweet = require('./createTweet');
const getAuth0AccessToken = require('./getAuth0AccessToken');
const getTwitterTokens = require('./getTwitterTokens');

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
router.use('/tweetstorm', cors(), async ({ body: { items, userId } }, res, next) => {
  const auth0AccessToken = await getAuth0AccessToken({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
  });

  const {
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret,
  } = await getTwitterTokens({
    auth0AccessToken,
    domain: process.env.AUTH0_DOMAIN,
    userId,
  });

  const tweet = await createTweet({
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret,
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRETE_KEY,
    inReplyToStatusId: null, // INFO: this must be a string
    status: items[0].tweet,
  });

  send({
    data: null,
    error: null,
    items,
    res,
    twitterStatusId: tweet.data.id_str,
    userId,
  });
});

module.exports = router;
