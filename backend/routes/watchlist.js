const express = require("express");
const router = express.Router();
const Watchlist = require("../models/Watchlist");

// POST /api/watchlist/add → Add to list
router.post("/add", async (req, res) => {
  const { username, anime } = req.body;
  console.log(`🔥 ADD triggered by user: ${username}`);
  console.log("📦 Anime payload:", anime);

  try {
    const existing = await Watchlist.findOne({
      username,
      "anime.id": anime.id,
    });

    if (existing) {
      console.log("⚠️ Already exists, skipping insert.");
      return res.status(400).json({ msg: "Anime already in watchlist" });
    }

    const newEntry = new Watchlist({ username,
       anime,
       });
    await newEntry.save();
    console.log("✅ Anime added successfully.");
    res.status(200).json({ msg: "Added to watchlist" });
  } catch (err) {
    console.error("❌ Server error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});
// GET /api/watchlist/:username → Get user's watchlist
router.get("/:username", async (req, res) => {
  try {
    const list = await Watchlist.find({ username: req.params.username });
    console.log("📥 DB Response:", list);
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

module.exports = router;
