// models/hotelModel.js
const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    hotelName: { type: String, required: true },
    image: { type: String, required: true },
    pricePerDay: { type: Number, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Hotel', hotelSchema);
