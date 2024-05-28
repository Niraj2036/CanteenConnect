// backend/routes/menuRoutes.js
const express = require('express');
const router = express.Router();
const { getAllMenuItems, getMenuItemsByCategory, getMenuItemById } = require('../controllers/menuController');

router.get('/', getAllMenuItems);
router.get('/category/:category', getMenuItemsByCategory);
router.get('/:id', getMenuItemById);

module.exports = router;
