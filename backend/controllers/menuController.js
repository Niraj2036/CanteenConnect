const Menu = require('../models/menuModel');

// Get all menu items
exports.getAllMenuItems = async (req, res) => {
    try {
        const menuItems = await Menu.find();
        res.status(200).json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get menu items by category
exports.getMenuItemsByCategory = async (req, res) => {
    const { category } = req.params;

    try {
        const menuItems = await Menu.find({ category });
        res.status(200).json(menuItems);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get menu item by ID
exports.getMenuItemById = async (req, res) => {
    const { id } = req.params;

    try {
        const menuItem = await Menu.findById(id);
        if (!menuItem) {
            return res.status(404).json({ error: "Menu item not found" });
        }
        res.status(200).json(menuItem);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
