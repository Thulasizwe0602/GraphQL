const bcrypt = require('bcryptjs');
const User = require('../models/user');
const Permission = require('../models/permission');
const UserType = require('../models/userType');

const {dateToString} = require('../helpers/helper')

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

module.exports = {
    permissions: async () => {
       try {
            const permissions = await Permission.find();
            return permissions.map(permission => {
                return { ...permission._doc };
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    userTypes: async () => {
        try {
            const userTypes = await UserType.find();
            return userTypes.map(userType => {
                return { ...userType._doc };
            });
        }
        catch (err) {
            console.log(err);
        }
     },         
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdAt: dateToString(user._doc.createdAt),
                    updatedAt: dateToString(user._doc.updatedAt),
                    userTypeId: userTypeFindById.bind(this, user._doc.userTypeId),
                    permissionId: permissionFindById.bind(this, user._doc.permissionId)
                };
            });
        }
        catch (err) {
            console.log(err);
        }
     },

    createPermission: async args => {
        const permission = new Permission({
            permissionName: args.permissionInput.permissionName,
            createdAt: new Date().toISOString()
        });
        
        try {
            const result = await permission.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUserType: async args => {
        const userType = new UserType({
            userTypeName: args.userTypeInput.userTypeName
        });
        
        try {
            const result = await userType.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },
    createUser: async args => {  
        try {
            const duplicateUser = await User.findOne({ emailAddress: args.userInput.emailAddress });
            if (duplicateUser) {
                throw new Error('Email address already exist in the system.');
            }
            const encryptedPassword = await bcrypt.hash(args.userInput.password, 12);
            console.log("Successfully encrypted your password");
            const user = new User({
                firstName: args.userInput.firstName,
                lastName: args.userInput.lastName,
                emailAddress: args.userInput.emailAddress,
                password: encryptedPassword,
                cellphoneNumber: args.userInput.cellphoneNumber,
                isProfileUpdated: args.userInput.isProfileUpdated,
                isActive: args.userInput.isActive,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                userTypeId: '5de3d5650ed14e442c93402e',
                permissionId: '5de3c0d7bc849a4cb0088bf3',
            });
            
            let createdUser;
            try {
                const result = await user.save();
                console.log(result);
                createdUser = { ...result._doc, password: null };
                return createdUser;
            }
            catch (err) {
                console.log(err);
                throw err;
            }
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};