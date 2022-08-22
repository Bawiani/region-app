const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    regionname: {
        type: String,
        required: true
    },
    capital: {
        type: String,
        required: true
    }
});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;