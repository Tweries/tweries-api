async function createTweet({ inReplyToStatusId = null, status, T }) {
  const options = {
    source:
      '<a href="https://tweries.com" rel="noopener noreferrer" target="_blank">Tweries</a>',
    status
  };
  if (inReplyToStatusId !== null) {
    options.in_reply_to_status_id = inReplyToStatusId;
  }

  const response = await T.post('statuses/update', options);
  return response;
}

module.exports = createTweet;
