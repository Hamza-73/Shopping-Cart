const mongoose = require('mongoose');

const productScehma = new mongoose.Schema({
    name: { type: String, min: 3, require: true },
    description: { type: String, min: 10, max: 500, require: true },
    price: { type: Number, rquired: true },
    rating: { type: Array, default: [] },
    img: { type: String },
    quantity: { type: Number, required: true },
    available: { type: Boolean, default: true } // chcek if it is available or not
});

module.exports = mongoose.model("Product", productScehma);