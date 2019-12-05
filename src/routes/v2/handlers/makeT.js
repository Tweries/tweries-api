const Twit = require('twit');

const { TWITTER_API_KEY, TWITTER_API_SECRETE_KEY } = process.env;

function makeT({ accessToken, accessTokenSecret }) {
  const T = new Twit({
    consumer_key: TWITTER_API_KEY,
    consumer_secret: TWITTER_API_SECRETE_KEY,
    access_token: accessToken,
    access_token_secret: accessTokenSecret
  });

  return T;
}

module.exports = makeT;
