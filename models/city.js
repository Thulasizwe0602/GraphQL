const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const citySchema = new Schema({
    cityName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('city', citySchema);