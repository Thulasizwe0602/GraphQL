const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userTypeSchema = new Schema({
    userTypeName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('userType', userTypeSchema);