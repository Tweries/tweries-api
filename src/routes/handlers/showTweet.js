async function showTweet({ tweetUrl, T }) {
  const statusId = tweetUrl.split('/')[tweetUrl.split('/').length - 1];
  const options = { id: statusId };
  const { data } = await T.get('statuses/show', options);
  return data;
}

module.exports = showTweet;
