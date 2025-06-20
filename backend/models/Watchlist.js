const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  animeId: Number,
  title: String,
  image: String,
  status: {
    type: String,
    enum: ["watching", "completed", "plan to watch"],
    default: "plan to watch"
  }
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);
