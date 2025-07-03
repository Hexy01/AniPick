const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");

// POST /api/watchlist/add → Add to list
router.post("/add", async (req, res) => {
  const { username, anime } = req.body;
  try {
    const existing = await Watchlist.findOne({
      username,
      "anime.id": anime.id,
    });

    if (existing) {
      return res.status(200).json({ exists: true });
    }

    const newEntry = new Watchlist({ username, anime });
    await newEntry.save();
    res.status(200).json({ success: true });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// GET /api/watchlist/:username → Get user's watchlist
router.get("/:username", async (req, res) => {
  try {
    const list = await Watchlist.find({ username: req.params.username });
    res.status(200).json(list);
  } catch (err) {
    res.status(500).json({ msg: "Failed to fetch watchlist" });
  }
});

// DELETE /api/watchlist/:id → Remove anime from watchlist
router.delete("/:id", async (req, res) => {
  try {
    await Watchlist.findByIdAndDelete(req.params.id);
    res.status(200).json({ msg: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ msg: "Failed to delete", error: err.message });
  }
});

// PATCH /api/watchlist/favorite/:username/:animeId → Toggle favorite status
router.patch("/favorite/:username/:animeId", async (req, res) => {
  const { username, animeId } = req.params;

  try {
    const entry = await Watchlist.findOne({
      username,
      "anime.id": animeId,
    });

    if (!entry) {
      return res.status(404).json({ msg: "Anime not found in user's watchlist." });
    }

    // Toggle the favorite value
    entry.anime.favorite = !entry.anime.favorite;
    await entry.save();

    res.status(200).json({ success: true, favorite: entry.anime.favorite });
  } catch (err) {
    console.error("❌ Failed to toggle favorite:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

module.exports = router;
