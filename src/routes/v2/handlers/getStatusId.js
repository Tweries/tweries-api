function getStatusId(tweetUrl) {
  if (tweetUrl) {
    const statusId = tweetUrl.split('/')[tweetUrl.split('/').length - 1];
    return statusId;
  }
  return tweetUrl;
}

module.exports = getStatusId;
