const mongoose = require('mongoose');

module.exports = () => {
    /**
     * For unthinkable reasons, the MongoDB Node.js driver is throwing a
     * `DeprecationWarning` even when the options below are passed to
     * `mongoose#connect`. Setting it globally was the only way found to
     * avoid this problem.
     */
    mongoose.set('useNewUrlParser', true);

    mongoose.connect(process.env.MONGODB_URI, {
        useCreateIndex: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    });
    
    mongoose.connect('connected', () => console.log('Successfully connected to MongoDB'));
};
