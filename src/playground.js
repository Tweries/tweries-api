require('dotenv').config();
const createTweet = require('./routes/createTweet');
const getAuth0AccessToken = require('./routes/getAuth0AccessToken');
const getTwitterTokens = require('./routes/getTwitterTokens');

const STATUS = `HELLO ${Date.now()}`;
const {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  TWITTER_API_KEY,
  TWITTER_API_SECRETE_KEY,
  USER_ID,
} = process.env;

(async () => {
  const auth0AccessToken = await getAuth0AccessToken({
    clientId: AUTH0_CLIENT_ID,
    clientSecret: AUTH0_CLIENT_SECRET,
    domain: AUTH0_DOMAIN,
  });
  // console.log(auth0AccessToken);

  const {
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret,
  } = await getTwitterTokens({
    auth0AccessToken,
    domain: AUTH0_DOMAIN,
    userId: USER_ID,
  });
  // console.log(twitterAccessToken, twitterAccessTokenSecret);

  const tweet = await createTweet({
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret,
    consumerKey: TWITTER_API_KEY,
    consumerSecret: TWITTER_API_SECRETE_KEY,
    inReplyToStatusId: null, // INFO: this must be a string
    status: STATUS,
  });

  console.log(JSON.stringify(tweet));
})();
