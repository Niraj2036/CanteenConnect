const express = require('express');
const router = express.Router();
const { placeOrder, getOrdersByUserId } = require('../controllers/orderController');

router.post('/place', placeOrder);
router.get('/:userId', getOrdersByUserId);

module.exports = router;
