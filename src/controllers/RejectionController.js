const Booking = require('../models/Booking');

const RejectionController = {
    async store(req, res) {
        const { booking_id } = req.params;

        const booking = await Booking.findById(booking_id).populate('spot');
        booking.approved = false;
        await booking.save();

        const bookingUserSocket = req.connectedUsers[booking.user];

        if (bookingUserSocket) {
            console.log('[WS] user: ', bookingUserSocket, booking.toJSON());
            req.io.to(bookingUserSocket).emit('booking_response', booking);
        }

        return res.json(booking);
    }
};

module.exports = RejectionController;
