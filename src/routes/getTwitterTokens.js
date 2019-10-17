const fetch = require('node-fetch');

async function getTwitterTokens({ auth0AccessToken, domain, userId }) {
  const options = {
    headers: {
      authorization: `Bearer ${auth0AccessToken}`,
    },
  };

  const response = await fetch(`https://${domain}/api/v2/users/${userId}`, options);
  const { identities } = await response.json();
  const { access_token: accessToken, access_token_secret: accessTokenSecret } = identities.find(
    (identity) => identity.provider === 'twitter',
  );
  return { accessToken, accessTokenSecret };
}

module.exports = getTwitterTokens;
