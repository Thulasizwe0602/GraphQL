const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackTypeSchema = new Schema({
    feedbackTypeName: {
        type: String,
        required: true
    }
});

module.exports = mongoose.model('feedbackType', feedbackTypeSchema);