const mongoose = request('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    firstName: {
        type: String,
        required : true
    },
    lastName: {
        type: String,
        required : true
    },
    emailAdress: {
        type: String,
        required : true
    },
    password: {
        type: String,
        required : true
    },
    cellphoneNumber: {
        type: String,
        required : false
    },
    createdAt: {
        type: Date,
        required : true
    },
    updatedAt: {
        type: Date,
        required : true
    },
    userTypeId: {
        type: Number,
        required : true
    },
    permissionId: {
        type: ObjectID(),
        required : true
    },    
});

module.exports =mongoose.model('User', userSchema);