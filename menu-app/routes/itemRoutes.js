const express = require('express');
const Item = require('../models/Item');
const router = express.Router();

// Create a new item
router.post('/', async (req, res) => {
  const { name, description, price, menu } = req.body;
  try {
    const item = new Item({ name, description, price, menu });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Get items for a specific menu
router.get('/:menuId', async (req, res) => {
  try {
    const items = await Item.find({ menu: req.params.menuId });
    res.status(200).json(items);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
