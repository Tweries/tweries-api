const dictionary = { env: 'test' };

const reqBase = {
  app: { get: (key) => dictionary[key] },
  originalUrl: '/api/v1/mock'
};

const mockSend = jest.fn();
const resBase = { send: mockSend };

const matcherV2 = {
  meta: {
    timestamp: expect.any(Number),
    version: expect.any(String)
  }
};

// TODO: rename this object
const tweet = {
  created_at: 'Tue Nov 26 23:47:00 +0000 2019',
  id: 1199474666412236800,
  id_str: '1199474666412236800',
  text: 'test',
  truncated: false,
  entities: { hashtags: [], symbols: [], user_mentions: [], urls: [] },
  source: '<a href="https://tweries.com" rel="nofollow">TweriesApp</a>',
  in_reply_to_status_id: null,
  in_reply_to_status_id_str: null,
  in_reply_to_user_id: null,
  in_reply_to_user_id_str: null,
  in_reply_to_screen_name: null,
  user: {
    id: 1183836409850814500,
    id_str: '1183836409850814464',
    name: 'china-musk',
    screen_name: 'musk_china',
    location: '',
    description: '',
    url: null,
    entities: { description: { urls: [] } },
    protected: false,
    followers_count: 0,
    friends_count: 2,
    listed_count: 0,
    created_at: 'Mon Oct 14 20:06:48 +0000 2019',
    favourites_count: 3,
    utc_offset: null,
    time_zone: null,
    geo_enabled: false,
    verified: false,
    statuses_count: 56,
    lang: null,
    contributors_enabled: false,
    is_translator: false,
    is_translation_enabled: false,
    profile_background_color: 'F5F8FA',
    profile_background_image_url: null,
    profile_background_image_url_https: null,
    profile_background_tile: false,
    profile_image_url:
      'http://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
    profile_image_url_https:
      'https://abs.twimg.com/sticky/default_profile_images/default_profile_normal.png',
    profile_link_color: '1DA1F2',
    profile_sidebar_border_color: 'C0DEED',
    profile_sidebar_fill_color: 'DDEEF6',
    profile_text_color: '333333',
    profile_use_background_image: true,
    has_extended_profile: false,
    default_profile: true,
    default_profile_image: true,
    can_media_tag: true,
    followed_by: false,
    following: false,
    follow_request_sent: false,
    notifications: false,
    translator_type: 'none'
  },
  geo: null,
  coordinates: null,
  place: null,
  contributors: null,
  is_quote_status: false,
  retweet_count: 0,
  favorite_count: 0,
  favorited: false,
  retweeted: false,
  lang: 'en'
};

module.exports = { matcherV2, mockSend, reqBase, resBase, tweet };
