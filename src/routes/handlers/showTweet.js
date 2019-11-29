async function showTweet({ statusId, T }) {
  const options = { id: statusId };
  const response = await T.get('statuses/show', options);
  return response;
}

module.exports = showTweet;
