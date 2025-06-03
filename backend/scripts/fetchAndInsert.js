const axios = require('axios');
const mongoose = require('mongoose');
require('dotenv').config();
const Anime = require('../models/Anime'); // adjust path if needed

async function fetchAndInsertAnime() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected');

    const response = await axios.get('https://api.jikan.moe/v4/top/anime');
    const animeList = response.data.data;

    const formattedAnime = animeList.map(item => ({
      title: item.title,
      image: item.images.jpg.image_url,
      synopsis: item.synopsis,
      episodes: item.episodes,
      score: item.score
    }));

    await Anime.insertMany(formattedAnime);
    console.log('Anime inserted successfully');
    process.exit(0);

  } catch (error) {
    console.error('Error inserting anime:', error.message);
    process.exit(1);
  }
}

fetchAndInsertAnime();
