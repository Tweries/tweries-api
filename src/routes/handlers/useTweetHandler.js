const debug = require('debug')('tweries-api:routes/paths/useTweet.js');
const { name, version } = require('../../../package.json');
const getAuth0AccessToken = require('./getAuth0AccessToken');
const getTwitterTokens = require('./getTwitterTokens');
const makeT = require('./makeT');
const showTweet = require('./showTweet');

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } = process.env;

// eslint-disable-next-line no-unused-vars
async function useTweetHandler(req, res, next) {
  const {
    body: { tweetUrl, userId }
  } = req;

  const auth0AccessToken = await getAuth0AccessToken({
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN
  });

  const {
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret
  } = await getTwitterTokens({
    auth0AccessToken,
    domain: AUTH0_DOMAIN,
    userId
  });

  const T = makeT({
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret
  });

  let error;
  let statusId;
  try {
    const tweet = await showTweet({
      tweetUrl,
      T
    });
    debug(tweet);
    statusId = tweet.id_str;
  } catch (error_) {
    error = error_;
  }

  const response = {
    env: req.app.get('env'),
    error,
    name,
    statusId,
    timestamp: Date.now(),
    tweetUrl,
    userId,
    version
  };

  if (error) {
    response.error = error;
    response.message = error.message;
  } else {
    response.message = '✅';
  }

  res.send(response);
}

module.exports = useTweetHandler;
