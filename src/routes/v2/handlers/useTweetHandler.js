const getAuth0AccessToken = require('../../handlers/getAuth0AccessToken');
const getTwitterTokens = require('../../handlers/getTwitterTokens');
const makeT = require('../../handlers/makeT');
const createResponse = require('./createResponse');
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

  let data;
  let error;
  try {
    data = await showTweet({ tweetUrl, T });
  } catch (error_) {
    error = error_;
  }

  const response = createResponse({ data, error, req });
  res.send(response);
}

module.exports = useTweetHandler;
