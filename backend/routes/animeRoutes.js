const express = require('express');
const router = express.Router();
const Anime = require('../models/Anime');

router.get('/', async (req, res) => {
  try {
    const animeList = await Anime.find();
    res.json(animeList);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
