const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Initialize the app
const app = express();
app.use(express.json());
app.use(cors());

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Routes
app.use('/api/menus', require('./routes/menuRoutes'));
app.use('/api/items', require('./routes/itemRoutes'));

app.get("/api/test", (req, res) => {
  console.log("API Hit");
  res.json({ message: "Backend Connected!" });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
