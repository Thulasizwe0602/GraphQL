
const Gender = require('../models/gender');

module.exports = {
    genders: async () => {
        try {
            const genders = await Gender.find();
            return genders.map(gender => {
                return { ...gender._doc };
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    createGender: async args => {
        const gender = new Gender({
            genderName: args.genderInput.genderName
        });

        try {
            const result = await gender.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};