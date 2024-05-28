const Order = require('../models/orderModel');
const Cart = require('../models/cartModel');

// Place order
exports.placeOrder = async (req, res) => {
    const { userId, canteen, building, roomNo } = req.body;

    try {
        const cart = await Cart.findOne({ userId });

        if (!cart) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const totalPrice = cart.items.reduce((acc, item) => acc + item.quantity * item.menuItemId.price, 0);

        const newOrder = new Order({
            userId,
            items: cart.items,
            canteen,
            building,
            roomNo,
            totalPrice
        });

        await newOrder.save();

        // Clear cart after order is placed
        await Cart.findOneAndDelete({ userId });

        res.status(201).json({ message: "Order placed successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get orders by user ID
exports.getOrdersByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const orders = await Order.find({ userId }).populate('items.menuItemId');
        if (!orders) {
            return res.status(404).json({ error: "No orders found" });
        }
        res.status(200).json(orders);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
