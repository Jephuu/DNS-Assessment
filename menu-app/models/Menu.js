const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    items: [{ type: Object }] // Array to hold the menu items
});

const Menu = mongoose.model("Menu", menuSchema);

module.exports = Menu;
