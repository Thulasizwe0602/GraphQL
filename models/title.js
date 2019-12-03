const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const titleSchema = new Schema({
    titleName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('title', titleSchema);