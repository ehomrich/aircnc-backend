const User = require('../models/User');

const SessionController = {
    async store(req, res, next) {
        const { email } = req.body;

        const user = await User.findOneAndUpdate(
            { email },
            { email },
            { new: true, upsert: true },
        );

        return res.json(user);
    },
};

module.exports = SessionController;
