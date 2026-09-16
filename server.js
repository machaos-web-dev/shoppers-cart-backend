require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const Order = require('./models/Order');

const app = express();
app.use(express.json());

// --- MongoDB Atlas connection ---
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB Atlas connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// --- GET: serve product JSON ---
app.get('/jb/products', (req, res) => {
  const filePath = path.join(__dirname, 'data', 'products.json');
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) return res.status(500).json({ error: 'Could not read products file' });
    res.json(JSON.parse(data));
  });
});

// --- POST: save data with timestamp ---
app.post('/jb/checkout', async (req, res) => {
  try {
    const order = new Order({ data: req.body });
    await order.save();
    res.status(201).json(order);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Failed to save order' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));