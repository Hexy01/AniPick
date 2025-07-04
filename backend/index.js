const express = require('express');
const cors = require('cors');
const app = express();

// ✅ Allow both local and Vercel frontend origins
app.use(cors({
  origin: ['http://localhost:5173', 'https://ani-pick-ochre.vercel.app'],
  credentials: true
}));

app.use(express.json());

// Your routes
const authRoutes = require('./routes/auth');
const watchlistRoutes = require('./routes/watchlist');

app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
