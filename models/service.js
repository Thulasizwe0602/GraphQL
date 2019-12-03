const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const serviceSchema = new Schema({
    serviceName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('service', serviceSchema);