const Booking = require('../models/Booking');

const DashboardController = {
    async store(req, res, next) {
        const { user_id: user } = req.headers;
        const { spot_id: spot } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({ date, user, spot });

        await booking.populate('spot user').execPopulate();

        const ownerSocket = req.connectedUsers[booking.spot.user];

        if (ownerSocket) {
            console.log('[WS] user: ', ownerSocket, booking.toJSON());
            req.io.to(ownerSocket).emit('booking_request', booking);
        }

        return res.json(booking);
    },
};

module.exports = DashboardController;
