const mongoose = require('mongoose');

const bookingSchema = new mongoose.Schema({
    date: String,
    approved: Boolean,
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    spot: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Spot',
    },
});

const Booking = mongoose.model('Booking', bookingSchema);

module.exports = Booking;
