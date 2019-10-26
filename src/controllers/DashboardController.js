const Spot = require('../models/Spot');

const DashboardController = {
    async show(req, res, next) {
        const { user_id: user } = req.headers;

        const spots = await Spot.find({ user });

        return res.json(spots);
    },
};

module.exports = DashboardController;
