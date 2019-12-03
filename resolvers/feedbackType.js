
const FeedbackType = require('../models/feedbackType');

module.exports = {
    feedbackTypes: async () => {
        try {
            const feedbackTypes = await FeedbackType.find();
            return feedbackTypes.map(feedbackType => {
                return { ...feedbackType._doc };
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    createFeedbackType: async args => {
        const feedbackType = new FeedbackType({
            feedbackTypeName: args.feedbackTypeInput.feedbackTypeName
        });

        try {
            const result = await feedbackType.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};