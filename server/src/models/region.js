const mongoose = require('mongoose');

const regionSchema = new mongoose.Schema({
    regionname: {
        type: String,
        required: true
    },
    districtname: {
        type: String,
        required: true
    }
});

const Region = mongoose.model('Region', regionSchema);

module.exports = Region;