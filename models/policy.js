const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const policySchema = new Schema({
    policyNumber: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },
    genderId: {
        type: Schema.Types.ObjectID,
        ref: 'Gender',
        required: true
    },
    titleId: {
        type: Schema.Types.ObjectID,
        ref: 'Title',
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }

});

module.exports = mongoose.model('policy', policySchema);