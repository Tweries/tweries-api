require('dotenv').config();
const createTweet = require('./routes/createTweet');
const getAuth0AccessToken = require('./routes/getAuth0AccessToken');
const getTwitterTokens = require('./routes/getTwitterTokens');

const STATUS = `HELLO ${Date.now()}`;
const USER_ID = 'twitter|1183836409850814464'; // INFO: @musk_china

(async () => {
  const auth0AccessToken = await getAuth0AccessToken({
    clientId: process.env.AUTH0_CLIENT_ID,
    clientSecret: process.env.AUTH0_CLIENT_SECRET,
    domain: process.env.AUTH0_DOMAIN,
  });
  // console.log(auth0AccessToken);

  const {
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret,
  } = await getTwitterTokens({
    auth0AccessToken,
    domain: process.env.AUTH0_DOMAIN,
    userId: USER_ID,
  });
  // console.log(twitterAccessToken, twitterAccessTokenSecret);

  const tweet = await createTweet({
    accessToken: twitterAccessToken,
    accessTokenSecret: twitterAccessTokenSecret,
    consumerKey: process.env.TWITTER_API_KEY,
    consumerSecret: process.env.TWITTER_API_SECRETE_KEY,
    inReplyToStatusId: null, // INFO: this must be a string
    status: STATUS,
  });

  console.log(JSON.stringify(tweet));
})();
