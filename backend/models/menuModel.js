const mongoose = require('mongoose');

const menuSchema = new mongoose.Schema({
    _id: String,
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        required: true
    }
});

module.exports = mongoose.model('Menu', menuSchema);
