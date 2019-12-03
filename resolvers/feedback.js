
const Feedback = require('../models/feedback');

const { dateToString } = require('../helpers/helper');
const { policy, department, feedbackType } = require('./resolverHelper');

const newDate = new Date().toISOString();;

module.exports = {
    feedbacks: async (args) => {
        try {

            const feedbacks = await Feedback.find();
            console.log(feedbacks);
            return feedbacks.map(feedback => {
                return {
                    ...feedback._doc,
                    _id: feedback.id,
                    name: feedback.name,
                    phoneNumber: feedback.phoneNumber,
                    email: feedback.email,
                    idNumber: feedback.idNumber,
                    feedback: feedback.feedback,
                    isClosed: feedback.isClosed,
                    createdAt: dateToString(feedback._doc.createdAt),
                    updatedAt: dateToString(feedback._doc.updatedAt),
                    policyId: policy.bind(this, feedback._doc.policyId),
                    departmentId: department.bind(this, feedback._doc.departmentId),
                    feedbackTypeId: feedbackType.bind(this, feedback._doc.feedbackTypeId)
                };
            });

        }
        catch (err) {
            console.log(err);
        }
    },

    createFeedBack: async (args) => {
        try {
            const feedback = new Feedback({
                name: args.feedbackInput.name,
                phoneNumber: args.feedbackInput.phoneNumber,
                email: args.feedbackInput.email,
                idNumber: args.feedbackInput.idNumber,
                feedback: args.feedbackInput.feedback,
                isClosed: false,
                createdAt: newDate,
                updatedAt: newDate,
                policyId: '5de643b0586eb80fe4d8251b',
                departmentId: '5de64daddc16bb40a4e8ceda',
                feedbackTypeId: '5de629168301d34254dcec97'
            });

            let createdFeedback;
            try {
                const result = await feedback.save();
                console.log(result);
                createdFeedback = { ...result._doc };
                return createdFeedback;
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
};