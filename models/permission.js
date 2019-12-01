const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const permissionSchema = new Schema({
    permissionName: {
        type: String,
        required: true
    },   
    createdAt: {
        type: Date
    }
});

module.exports = mongoose.model('Permission', permissionSchema);