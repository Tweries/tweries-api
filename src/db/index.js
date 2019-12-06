require('dotenv').config();
const { MongoClient } = require('mongodb');
const { name } = require('../../package.json');

const COLLECTION_NAME = 'tweetstorm';
const { MONGODB_PASSWORD, MONGODB_USER, NODE_ENV } = process.env;
const MONGODB_URI = `mongodb+srv://${MONGODB_USER}:${MONGODB_PASSWORD}@cluster0-qx40g.mongodb.net/test?retryWrites=true&w=majority`;

async function insert(response) {
  try {
    const client = new MongoClient(MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    await client.connect();
    const collection = client
      .db(`${name}_${NODE_ENV || 'dev'}`)
      .collection(COLLECTION_NAME);
    const { result } = await collection.insertOne(response);
    client.close();
    return { result };
  } catch (error) {
    return { error };
  }
}

module.exports = { insert };
