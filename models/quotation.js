const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const quotationSchema = new Schema({
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
        required: false
    },
    phoneNumber: {
        type: String,
        required: true
    },
    isClosed: {
        type: Boolean
    },
    servicePackageId: {
        type: Schema.Types.ObjectID,
        ref: 'ServincePackage',
        required: true
    },
    provinceId: {
        type: Schema.Types.ObjectID,
        ref: 'Province',
        required: true
    },
    cityId: {
        type: Schema.Types.ObjectID,
        ref: 'City',
        required: true
    },
    createdAt: {
        type: Date
    },
    updatedAt: {
        type: Date
    }
});

module.exports = mongoose.model('quotation', quotationSchema);