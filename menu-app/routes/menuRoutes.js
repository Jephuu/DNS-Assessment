const express = require('express');
const Menu = require('../models/Menu');
const router = express.Router();

// Create a new menu
router.post("/api/menu", async (req, res) => {
  const { name, description } = req.body;

  try {
      const newMenu = new Menu({
          name,
          description,
          items: [] // Initialize with an empty items array
      });

      await newMenu.save(); // Save the menu to the database
      res.status(200).json(newMenu); // Return the newly created menu
  } catch (error) {
      console.error("Error adding menu:", error);
      res.status(500).json({ message: "Server error. Could not add menu." });
  }
});

// Get all menus
router.get('/', async (req, res) => {
  try {
    const menus = await Menu.find();
    res.status(200).json(menus);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
