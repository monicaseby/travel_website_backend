// models/Preference.js

const mongoose = require('mongoose');

const preferenceSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', 
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
        min: 1,
    },
    budget: {
        type: String,
        required: true,
    },
    companion: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});

const Preference = mongoose.model('Preference', preferenceSchema);

module.exports = Preference;