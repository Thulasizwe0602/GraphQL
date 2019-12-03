const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const departmentSchema = new Schema({
    departmentName: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        required: true
    },
    updatedAt: {
        type: Date,
        required: true
    },
    lineManagerId: {
        type: Schema.Types.ObjectID,
        ref: 'User',
        required: true
    },

});

module.exports = mongoose.model('department', departmentSchema);