const { SimilarList, LikeList } = require('./index.js');

const MongoClient = require('mongodb').MongoClient;
// const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'similarandlike';

// Create a new MongoClient
const client = new MongoClient(url);

// create findDocuments function
const findDocuments = function(db, callback) {
  // Get the documents collection
  const collection = db.collection('documents');
  // Find some documents
  collection.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    console.log("Found the following records");
    console.log(docs)
    callback(docs);
  });
}


// Use connect method to connect to the Server
client.connect(function(err) {
  // assert.equal(null, err);
  if (err) console.error(err)
  console.log("Connected successfully to server");

  const db = client.db(dbName);

  client.close();
});