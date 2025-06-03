const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();
const animeRoutes = require('./routes/animeRoutes');
console.log(animeRoutes); // Should not be undefined
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => res.send('AniPick API is running!'));
app.use('/api/anime', animeRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
