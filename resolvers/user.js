const User = require('../models/user');
const {dateToString} = require('../helpers/helper');
const {userType, permission} = require('./resolverHelper');

const bcrypt = require('bcryptjs');

module.exports = {         
    users: async () => {
        try {
            const users = await User.find();
            return users.map(user => {
                return {
                    ...user._doc,
                    _id: user.id,
                    createdAt: dateToString(user._doc.createdAt),
                    updatedAt: dateToString(user._doc.updatedAt),
                    userTypeId: userType.bind(this, user._doc.userTypeId),
                    permissionId: permission.bind(this, user._doc.permissionId)
                };
            });
        }
        catch (err) {
            console.log(err);
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