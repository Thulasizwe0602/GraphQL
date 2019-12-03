
const UserType = require('../models/userType');

module.exports = {
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
    }
};