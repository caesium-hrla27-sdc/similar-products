const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/similarandlike', {
  useNewUrlParser: true
});

const db = mongoose.connection;

db.on('error', err => console.log('CONNECTION ERROR: ', err));
db.once('open', () => console.log('Connected to the database.'));

const similarSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  similar: Array
});

const likeSchema = new mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  like: Array
});

const SimilarList = mongoose.model('Similarlist', similarSchema);
const LikeList = mongoose.model('LikeList', likeSchema);

module.exports = {
  SimilarList,
  LikeList
};