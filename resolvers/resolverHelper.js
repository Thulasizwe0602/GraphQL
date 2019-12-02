const UserType = require('../models/userType');
const Permission = require('../models/permission');
const {dateToString} = require('../helpers/helper');


const userTypeFindById = async userTypeId => {
    try {
        const userType = await UserType.findById(userTypeId);
        return { ...userType._doc };
    }
    catch (err) {
        console.log(err);
    }
}

const permissionFindById = async permissionId => {
    try {
        const permission = await Permission.findById(permissionId);
        return {
            ...permission._doc,
            createdAt: dateToString(permission._doc.createdAt)
        };
    }
    catch (err) {
        console.log(err);
    }
}

exports.userType = userTypeFindById;
exports.permission = permissionFindById;