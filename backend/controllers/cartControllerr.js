const Cart = require('../models/cartModel');

// Add item to cart
exports.addItemToCart = async (req, res) => {
    const { userId, menuItemId, quantity } = req.body;

    try {
        let cart = await Cart.findOne({ userId });

        if (cart) {
            // If cart exists for user, update it
            const itemIndex = cart.items.findIndex(item => item.menuItemId.toString() === menuItemId);

            if (itemIndex > -1) {
                let item = cart.items[itemIndex];
                item.quantity += quantity;
                cart.items[itemIndex] = item;
            } else {
                cart.items.push({ menuItemId, quantity });
            }

            cart = await cart.save();
            return res.status(200).json(cart);
        } else {
            // If no cart exists, create one
            const newCart = new Cart({ userId, items: [{ menuItemId, quantity }] });
            await newCart.save();
            return res.status(201).json(newCart);
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};

// Get cart by user ID
exports.getCartByUserId = async (req, res) => {
    const { userId } = req.params;

    try {
        const cart = await Cart.findOne({ userId }).populate('items.menuItemId');
        if (!cart) {
            return res.status(404).json({ error: "Cart not found" });
        }
        res.status(200).json(cart);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
};
