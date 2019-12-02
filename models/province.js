const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const provinceSchema = new Schema({
    provinceName: {
        type: String,
        required: true
    },
    cities: [{
        type: Schema.Types.ObjectID,
        ref: 'City',
        required : true   
    }]
});

module.exports = mongoose.model('province', provinceSchema);