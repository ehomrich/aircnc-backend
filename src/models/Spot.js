const mongoose = require('mongoose');

const spotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
}, {
    toJSON: { virtuals: true },
});

spotSchema.virtual('thumbnail_url').get(function () {
    return `http://localhost:${process.env.PORT}/files/${encodeURIComponent(this.thumbnail)}`;
});

const Spot = mongoose.model('Spot', spotSchema);

module.exports = Spot;
