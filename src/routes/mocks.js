const dictionary = { env: 'test' };

const reqBase = {
  app: { get: key => dictionary[key] }
};

const mockSend = jest.fn();
const resBase = { send: mockSend };

const matcher = {
  timestamp: expect.any(Number)
};

const tweet = {
  data: {
    created_at: 'Fri Nov 29 21:07:13 +0000 2019',
    id: 1200521619145257000,
    id_str: '1200521619145256960',
    text:
      'One advantage of being a professional mutt is that you have no horse in the race.',
    truncated: false,
    entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
    source:
      '<a href="http://twitter.com/#!/download/ipad" rel="nofollow">Twitter for iPad</a>',
    in_reply_to_status_id: null,
    in_reply_to_status_id_str: null,
    in_reply_to_user_id: null,
    in_reply_to_user_id_str: null,
    in_reply_to_screen_name: null,
    user: {
      id: 533409964,
      id_str: '533409964',
      name: 'John Cutler',
      screen_name: 'johncutlefish',
      location: '',
      description:
        'Product development nut @Amplitude_HQ. I love wrangling complex problems/answering the why with qual/quant data. Writing at https://t.co/r1JgWT0NOs',
      url: null,
      entities: {
        description: {
          urls: [
            {
              url: 'https://t.co/r1JgWT0NOs',
              expanded_url: 'https://medium.com/@johnpcutler',
              display_url: 'medium.com/@johnpcutler',
              indices: [124, 147]
            }
          ]
        }
      },
      protected: false,
      followers_count: 31430,
      friends_count: 13323,
      listed_count: 1944,
      created_at: 'Thu Mar 22 19:22:32 +0000 2012',
      favourites_count: 84926,
      utc_offset: null,
      time_zone: null,
      geo_enabled: true,
      verified: false,
      statuses_count: 44853,
      lang: null,
      contributors_enabled: false,
      is_translator: false,
      is_translation_enabled: false,
      profile_background_color: 'C0DEED',
      profile_background_image_url:
        'http://abs.twimg.com/images/themes/theme1/bg.png',
      profile_background_image_url_https:
        'https://abs.twimg.com/images/themes/theme1/bg.png',
      profile_background_tile: false,
      profile_image_url:
        'http://pbs.twimg.com/profile_images/870169811812106241/z9fdNNjW_normal.jpg',
      profile_image_url_https:
        'https://pbs.twimg.com/profile_images/870169811812106241/z9fdNNjW_normal.jpg',
      profile_banner_url:
        'https://pbs.twimg.com/profile_banners/533409964/1454244608',
      profile_link_color: '1DA1F2',
      profile_sidebar_border_color: 'C0DEED',
      profile_sidebar_fill_color: 'DDEEF6',
      profile_text_color: '333333',
      profile_use_background_image: true,
      has_extended_profile: false,
      default_profile: true,
      default_profile_image: false,
      can_media_tag: true,
      followed_by: false,
      following: true,
      follow_request_sent: false,
      notifications: false,
      translator_type: 'none'
    },
    geo: null,
    coordinates: null,
    place: null,
    contributors: null,
    is_quote_status: false,
    retweet_count: 1,
    favorite_count: 5,
    favorited: false,
    retweeted: false,
    lang: 'en'
  },
  resp: {
    statusCode: 200,
    headers: {
      'cache-control':
        'no-cache, no-store, must-revalidate, pre-check=0, post-check=0',
      connection: 'close',
      'content-disposition': 'attachment; filename=json.json',
      'content-encoding': 'gzip',
      'content-length': '1071',
      'content-type': 'application/json;charset=utf-8',
      date: 'Fri, 29 Nov 2019 21:48:43 GMT',
      expires: 'Tue, 31 Mar 1981 05:00:00 GMT',
      'last-modified': 'Fri, 29 Nov 2019 21:48:43 GMT',
      pragma: 'no-cache',
      server: 'tsa_a',
      'set-cookie': [
        'personalization_id="v1_m+gt5KoDaLKwlqPMyyM6zg=="; Max-Age=63072000; Expires=Sun, 28 Nov 2021 21:48:43 GMT; Path=/; Domain=.twitter.com',
        'lang=en; Path=/',
        'guest_id=v1%3A157506412371513973; Max-Age=63072000; Expires=Sun, 28 Nov 2021 21:48:43 GMT; Path=/; Domain=.twitter.com'
      ],
      status: '200 OK',
      'strict-transport-security': 'max-age=631138519',
      'x-access-level': 'read-write',
      'x-connection-hash': 'b9b79b98e7fcae04875c3d934dc15475',
      'x-content-type-options': 'nosniff',
      'x-frame-options': 'SAMEORIGIN',
      'x-rate-limit-limit': '900',
      'x-rate-limit-remaining': '895',
      'x-rate-limit-reset': '1575064710',
      'x-response-time': '27',
      'x-transaction': '00a3df5700067fbb',
      'x-twitter-response-tags': 'BouncerCompliant',
      'x-xss-protection': '0'
    },
    request: {
      uri: {
        protocol: 'https:',
        slashes: true,
        auth: null,
        host: 'api.twitter.com',
        port: 443,
        hostname: 'api.twitter.com',
        hash: null,
        search: '?id=1200521619145256960',
        query: 'id=1200521619145256960',
        pathname: '/1.1/statuses/show.json',
        path: '/1.1/statuses/show.json?id=1200521619145256960',
        href:
          'https://api.twitter.com/1.1/statuses/show.json?id=1200521619145256960'
      },
      method: 'GET',
      headers: {
        Accept: '*/*',
        'User-Agent': 'twit-client',
        'Content-type': 'application/json',
        'accept-encoding': 'gzip, deflate',
        Authorization:
          'OAuth oauth_consumer_key="esA0m6HYfLANxdhKRkCMzNdKM",oauth_nonce="867353337d764362bb2832aebf217009",oauth_signature_method="HMAC-SHA1",oauth_timestamp="1575064122",oauth_token="1183836409850814464-fFPqxEJJWyHvPxlI1qzOZ8iUn9hwrS",oauth_version="1.0",oauth_signature="eVbPP3uZGAluTRmj4uflhCa8AQk%3D"'
      }
    }
  }
};

module.exports = { matcher, mockSend, reqBase, resBase, tweet };
