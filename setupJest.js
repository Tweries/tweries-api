require('dotenv').config();

const fetch = require('jest-fetch-mock');

jest.setMock('node-fetch', fetch);
