const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const User = require('../models/user');

const Permission = require('../models/permission');
const { dateToString, privateKey } = require('../helpers/helper');
const { userType, permission } = require('./resolverHelper');

const newDate = new Date().toISOString();;

module.exports = {
    users: async (args, request) => {
        try {
            // if (!request.isAuthorized) {
            //     throw new Error('User not authenticated.');
            // }

            const users = await User.find();
            console.log(users);
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

    createUser: async (args, request) => {
        try {
            // if (!request.isAuthorized) {
            //     throw new Error('User not authenticated.');
            // }

            // console.log(request.permissionId);
            // console.log(request.userTypeId);

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
                createdAt: newDate,
                updatedAt: newDate,
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
    },

    login: async ({ emailAddress, password }) => {
        try {
            const foundUser = await User.findOne({ emailAddress: emailAddress });
            if (!foundUser) {
                throw new Error('User does not exist!');
            }

            const isEqual = await bcrypt.compare(password, foundUser.password);
            if (!isEqual) {
                throw new Error('Username/Email or password entered are incorrect!!!');
            }

            const generatedToken = jwt.sign({ userId: foundUser.id, emailAddress: foundUser.emailAddress }, privateKey, {
                expiresIn: '1h'
            });

            const authData = {
                userId: foundUser.id,
                token: generatedToken,
                expiration: 1,
                permissionId: foundUser.permissionId.toString(),
                userTypeId: foundUser.userTypeId.toString()
            }

            console.log(authData);
            return authData;
        }
        catch (err) {
            throw new Error(err);
        }
    }
};