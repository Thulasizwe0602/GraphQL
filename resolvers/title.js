
const Title = require('../models/title');

module.exports = {
    titles: async () => {
        try {
            const titles = await Title.find();
            return titles.map(title => {
                return { ...title._doc };
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    createTitle: async args => {
        const title = new Title({
            titleName: args.titleInput.titleName
        });

        try {
            const result = await title.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};