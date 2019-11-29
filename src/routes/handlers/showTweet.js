async function showTweet({ tweetUrl, T }) {
  const statusId = tweetUrl.split('/')[tweetUrl.split('/').length - 1];
  const options = { id: statusId };
  const response = await T.get('statuses/show', options);
  return response;
}

module.exports = showTweet;
