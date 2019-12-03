const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const genderSchema = new Schema({
    genderName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('gender', genderSchema);