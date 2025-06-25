const express = require("express");
const router = express.Router();
const { verifyToken } = require("./auth"); // assuming this exists
const Watchlist = require("../models/Watchlist");
const Rating = require("../models/Rating");
const Review = require("../models/Review");

// Add to Watchlist
router.post("/watchlist", verifyToken, async (req, res) => {
  const { animeId, title, image, status } = req.body;
  const user = req.user.id;

  const exists = await Watchlist.findOne({ user, animeId });
  if (exists) return res.status(400).json({ message: "Already in watchlist" });

  const entry = new Watchlist({ user, animeId, title, image, status });
  await entry.save();
  res.status(201).json(entry);
});

// Add Rating
router.post("/rate", verifyToken, async (req, res) => {
  const { animeId, rating } = req.body;
  const user = req.user.id;

  const result = await Rating.findOneAndUpdate(
    { user, animeId },
    { rating },
    { upsert: true, new: true }
  );
  res.status(200).json(result);
});

// Add Review
router.post("/review", verifyToken, async (req, res) => {
  const { animeId, review } = req.body;
  const user = req.user.id;

  const result = new Review({ user, animeId, review });
  await result.save();
  res.status(201).json(result);
});

module.exports = router;
