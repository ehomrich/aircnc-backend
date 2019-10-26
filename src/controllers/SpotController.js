const Spot = require('../models/Spot');
const User = require('../models/User');

const SpotController = {
    async index(req, res, next) {
        const { tech } = req.query;

        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    async store(req, res, next) {
        const { company, price, techs } = req.body;
        const { filename: thumbnail } = req.file;
        const { user_id: user } = req.headers;

        const spot = await Spot.create({
            company,
            price,
            thumbnail,
            user,
            techs: techs.split(',').map(tech => tech.trim()).filter(tech => tech),
        });

        return res.json(spot);
    },
};

module.exports = SpotController;
