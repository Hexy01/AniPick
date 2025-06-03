const mongoose = require('mongoose');

const animeSchema = new mongoose.Schema({
  title: String,
  image: String,
  synopsis: String,
  episodes: Number,
  score: Number
});

module.exports = mongoose.model('Anime', animeSchema);
