// model/packageModel.js
const mongoose = require('mongoose');

const packageSchema = new mongoose.Schema({
    tourpackageName: { type: String, required: true },
    image: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    rating: { type: Number, default: 0 },
    reviews: { type: Number, default: 0 },
    location: { type: String },
});

module.exports = mongoose.model('Package', packageSchema);