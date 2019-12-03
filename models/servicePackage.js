const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const servicePackageSchema = new Schema({
    servicePackageName: {
        type: String,
        required: true
    },
    services: [{
        type: Schema.Types.ObjectID,
        ref: 'Service',
        required: true
    }]
});

module.exports = mongoose.model('servicePackage', servicePackageSchema);