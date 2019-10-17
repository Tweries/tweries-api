const Twit = require('twit');

async function createTweet({
  accessToken,
  accessTokenSecret,
  consumerKey,
  consumerSecret,
  inReplyToStatusId = null,
  status,
}) {
  const T = new Twit({
    consumer_key: consumerKey,
    consumer_secret: consumerSecret,
    access_token: accessToken,
    access_token_secret: accessTokenSecret,
  });

  let options = { status };
  if (inReplyToStatusId !== null) {
    options = { ...options, in_reply_to_status_id: inReplyToStatusId };
  }

  const response = await T.post('statuses/update', options);
  return response;
}

module.exports = createTweet;
