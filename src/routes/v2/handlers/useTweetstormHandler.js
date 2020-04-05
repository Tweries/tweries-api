const { insert } = require('../../../db/index');
const asyncForEach = require('./asyncForEach');
const createResponse = require('./createResponse');
const createTweet = require('./createTweet');
const getAuth0AccessToken = require('./getAuth0AccessToken');
const getStatusId = require('./getStatusId');
const getTwitterTokens = require('./getTwitterTokens');
const makeT = require('./makeT');
const uploadMedia = require('./uploadMedia');

const { AUTH0_CLIENT_ID, AUTH0_CLIENT_SECRET, AUTH0_DOMAIN } = process.env;

// eslint-disable-next-line no-unused-vars
async function useTweetstormHandler(req, res, next) {
  const {
    body: { items, inReplyToTweetUrl, userId },
    file
  } = req;

  const { BYPASS } = process.env;
  if (BYPASS === 'true') {
    const response = createResponse({
      data: { message: 'BYPASS', statusIds: ['BYPASS'], userId },
      req
    });
    res.send(response);
  } else {
    try {
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
      let mediaIdString = null;

      const statusIds = [];

      await asyncForEach(JSON.parse(items), async (item) => {
        if (file && statusIds.length === 0) {
          const data = await uploadMedia({ file, T });
          mediaIdString = data.mediaIdString;
        } else {
          mediaIdString = null;
        }

        const tweet = await createTweet({
          inReplyToStatusId,
          mediaIdString,
          status: item.tweet,
          T
        });
        inReplyToStatusId = tweet.data.id_str;
        statusIds.push(inReplyToStatusId);
      });

      const response = createResponse({
        data: { items: JSON.parse(items), statusIds, userId },
        req
      });

      // INFO: not a huge fan of this design
      const { error, result } = await insert(response);
      if (error) {
        response.error = error;
      }
      if (result) {
        response.data.result = result;
      }

      res.send(response);
    } catch (error) {
      res.send({ error }); // Status is a duplicate
    }
  }
}

module.exports = useTweetstormHandler;
