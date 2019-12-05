const getStatusId = require('./getStatusId');

async function showTweet({ tweetUrl, T }) {
  const statusId = getStatusId(tweetUrl);
  const options = { id: statusId };
  const { data } = await T.get('statuses/show', options);
  return data;
}

module.exports = showTweet;
