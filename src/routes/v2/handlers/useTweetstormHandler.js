const { insert } = require('../../../db/index');
const asyncForEach = require('../../handlers/asyncForEach');
const createTweet = require('../../handlers/createTweet');
const getAuth0AccessToken = require('../../handlers/getAuth0AccessToken');
const getTwitterTokens = require('../../handlers/getTwitterTokens');
const makeT = require('../../handlers/makeT');
const createResponse = require('./createResponse');
const getStatusId = require('./getStatusId');

const {
  AUTH0_CLIENT_ID,
  AUTH0_CLIENT_SECRET,
  AUTH0_DOMAIN,
  BYPASS
} = process.env;

// eslint-disable-next-line no-unused-vars
async function useTweetstormHandler(req, res, next) {
  const {
    body: { items, inReplyToTweetUrl, userId }
  } = req;

  if (BYPASS === 'true') {
    const response = createResponse({ data: { message: 'BYPASS' }, req });
    res.send(response);
  } else {
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

    let inReplyToStatusId = getStatusId(inReplyToTweetUrl);

    const statusIds = [];
    await asyncForEach(items, async item => {
      const tweet = await createTweet({
        inReplyToStatusId,
        status: item.tweet,
        T
      });
      inReplyToStatusId = tweet.data.id_str;
      statusIds.push(inReplyToStatusId);
    });

    const response = createResponse({ data: { statusIds }, req });

    // INFO: not a huge fan of this design
    const { error, result } = await insert(response);
    if (error) {
      response.error = error;
    }
    if (result) {
      response.data.result = result;
    }

    res.send(response);
  }
}

module.exports = useTweetstormHandler;
