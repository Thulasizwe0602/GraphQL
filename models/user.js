const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    emailAddress: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    cellphoneNumber: {
        type: String,
        required: false
    },
    isProfileUpdated: {
        type: Boolean
    },
    isActive: {
        type: Boolean
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    },
    userTypeId: {
        type: Schema.Types.ObjectID,
        ref: 'UserType',
        required: true
    },
    permissionId: {
        type: Schema.Types.ObjectID,
        ref: 'Permission',
        required: true
    },
});

module.exports = mongoose.model('User', userSchema);