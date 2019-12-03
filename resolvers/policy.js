
const Policy = require('../models/policy');

const { dateToString } = require('../helpers/helper');
const { user, gender, title } = require('./resolverHelper');

const newDate = new Date().toISOString();;

module.exports = {
    policies: async (args) => {
        try {

            const policies = await Policy.find();
            console.log(policies);
            return policies.map(policy => {
                return {
                    ...policy._doc,
                    _id: policy.id,
                    policyNumber: policy.policyNumber,
                    createdAt: dateToString(policy._doc.createdAt),
                    updatedAt: dateToString(policy._doc.updatedAt),
                    userId: user.bind(this, policy._doc.userId),
                    genderId: gender.bind(this, policy._doc.genderId),
                    titleId: title.bind(this, policy._doc.titleId)
                };
            });

        }
        catch (err) {
            console.log(err);
        }
    },

    createPolicy: async (args) => {
        try {
            let policyCount = await Policy.find().countDocuments();
            policyCount = parseInt(policyCount) == 0 ? 1 : parseInt(policyCount) + 1;

            const policy = new Policy({
                policyNumber: 'POLICY_' + policyCount,
                createdAt: newDate,
                updatedAt: newDate,
                userId: '5de63d98bc9f083e00642d65',
                genderId: '5de634efac81cc4188b27675',
                titleId: '5de62dad9111b813c841dff6'
            });

            let createdPolicy;
            try {
                const result = await policy.save();
                console.log(result);
                createdPolicy = { ...result._doc };
                return createdPolicy;
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