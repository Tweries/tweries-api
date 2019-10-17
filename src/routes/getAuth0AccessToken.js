const fetch = require('node-fetch');

async function getAuth0AccessToken({ clientId, clientSecret, domain }) {
  const options = {
    body: JSON.stringify({
      audience: `https://${domain}/api/v2/`,
      client_id: clientId,
      client_secret: clientSecret,
      grant_type: 'client_credentials',
    }),
    headers: { 'content-type': 'application/json' },
    method: 'POST',
  };

  const response = await fetch(`https://${domain}/oauth/token`, options);
  const { access_token: accessToken } = await response.json();
  return accessToken;
}

module.exports = getAuth0AccessToken;
