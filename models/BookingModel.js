// models/Booking.js
const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    packageName: { type: String, required: true },
    hotelName: { type: String },
    persons: { type: Number, required: true },
    date: { type: Date, required: true },
    status: {
        type: String,
        enum: ['Pending', 'Accepted', 'Rejected'], 
        default: 'Pending', 
    },
});

module.exports = mongoose.model('Booking', bookingSchema);