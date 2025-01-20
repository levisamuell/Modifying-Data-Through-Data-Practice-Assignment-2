const mongoose = require('mongoose');
const menuSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
    },
    price: {
        type: Number,
    },
});

module.exports = mongoose.model('Menu', menuSchema);