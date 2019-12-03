const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const feedbackSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    idNumber: {
        type: String,
        required: false
    },
    isClosed: {
        type: Boolean
    },
    feedback: {
        type: String,
        required: false
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    feedbackTypeId: {
        type: Schema.Types.ObjectID,
        ref: 'FeedbackType',
        required: true
    },
    policyId: {
        type: Schema.Types.ObjectID,
        ref: 'Policy',
        required: true
    },
    departmentId: {
        type: Schema.Types.ObjectID,
        ref: 'Department',
        required: true
    }
});

module.exports = mongoose.model('feedback', feedbackSchema);