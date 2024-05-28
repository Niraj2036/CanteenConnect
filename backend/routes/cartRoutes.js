const express = require('express');
const router = express.Router();
const { addItemToCart, getCartByUserId } = require('../controllers/cartController');

router.post('/add', addItemToCart);
router.get('/:userId', getCartByUserId);

module.exports = router;
