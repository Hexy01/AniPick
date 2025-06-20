const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
require('dotenv').config();

const animeRoutes = require('./routes/animeRoutes');
const authRoutes = require('./routes/auth'); 
const userActionsRoutes = require("./routes/userActions");
const app = express();
const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));
app.use(express.json());

const PORT = process.env.PORT || 5000;

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.get('/', (req, res) => res.send('AniPick API is running!'));
app.use('/api/animeRoutes', animeRoutes);
app.use('/api/auth', authRoutes);
app.use("/api", userActionsRoutes);

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
