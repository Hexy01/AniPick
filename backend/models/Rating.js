const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  animeId: Number,
  rating: Number
});

module.exports = mongoose.model("Rating", RatingSchema);
