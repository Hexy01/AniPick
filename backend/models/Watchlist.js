const mongoose = require("mongoose");

const WatchlistSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  anime: {
    id: Number,
    title: String,
    image: String,
    status: {
      type: String,
      enum: ["Watching", "Completed", "Plan to Watch"],
    },
  },
});

module.exports = mongoose.model("Watchlist", WatchlistSchema);

