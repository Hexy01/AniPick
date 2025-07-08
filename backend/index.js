const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const animeRoutes = require('./routes/animeRoutes');
const authRoutes = require('./routes/auth');
const watchlistRoutes = require("./routes/watchlist"); // ✅ Import the route file
// app.use("/api/watchlist", watchlistRoutes); // ✅ Register route correctly
const app = express();
app.use(cors({
  origin:["http://localhost:5173", "https://ani-pick-ten.vercel.app/"] ,
  methods: ["GET", "POST", "PATCH", "DELETE"],
  credentials: true,
}));

app.use(express.json());

const PORT = process.env.PORT || 5000;

// ✅ MongoDB Connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// ✅ Routes
app.get('/', (req, res) => res.send('AniPick API is running!'));
app.use('/api/anime', animeRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/watchlist', watchlistRoutes); // ✅ Watchlist routes added here

// ✅ Server Start
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
