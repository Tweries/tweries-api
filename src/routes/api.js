const cors = require('cors');
require('dotenv').config();
const express = require('express');
// const fetch = require('node-fetch');
// const Twit = require('twit');
const { name, version } = require('../../package.json');

const router = express.Router();

router.get('/health', cors(), (req, res, next) => {
  res.send({ message: "👋 hello, I'm healty", name, version });
});

function send({
  data, error, items, res, userId,
}) {
  res.send({
    data,
    error,
    items,
    message: 'WIP',
    name,
    userId,
    version,
  });
}

router.use('/tweetstorm', cors(), ({ body: { items, userId } }, res, next) => {
  send({
    data: null,
    error: null,
    items,
    res,
    userId,
  });
});

module.exports = router;

/*
  // STEP 1 get the access tocken
  const options = {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: 'https://dev-17-x3zfb.auth0.com/api/v2/',
      grant_type: 'client_credentials',
    }),
  };

  fetch('https://dev-17-x3zfb.auth0.com/oauth/token', options)
    .then((response) => response.json())
    .then(({ access_token: accessToken }) => {
      // STEP 2 get ?!?
      fetch(`https://dev-17-x3zfb.auth0.com/api/v2/users/${userId}`, {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      })
        .then((response) => response.json())
        .then(({ identities }) => {
          const {
            access_token: accessToken_,
            access_token_secret: accessTokenSecret,
          } = identities.find((identity) => identity.provider === 'twitter');
          // STEP 3 call Twitter API
          const T = new Twit({
            consumer_key: process.env.TWITTER_API_KEY,
            consumer_secret: process.env.TWITTER_API_SECRETE_KEY,
            access_token: accessToken_,
            access_token_secret: accessTokenSecret,
          });
          T.post('statuses/update', { status: items[0].tweet }, (err, data, response) => {
            console.log(data);
          });
          // reply to a tweet by id
        })
        .catch(console.log);
    })
    .catch(console.log);
*/
