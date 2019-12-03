
const Quotation = require('../models/quotation');


const { dateToString, privateKey } = require('../helpers/helper');
const { package, province, city } = require('./resolverHelper');

const newDate = new Date().toISOString();;

module.exports = {
    quotations: async (args) => {
        try {

            const quotations = await Quotation.find();
            console.log(quotations);
            return quotations.map(quotation => {
                return {
                    ...quotation._doc,
                    _id: quotation.id,
                    firstName: quotation.firstName,
                    lastName: quotation.lastName,
                    emailAddress: quotation.emailAddress,
                    phoneNumber: quotation.phoneNumber,
                    isClosed: quotation.isClosed,
                    createdAt: dateToString(quotation._doc.createdAt),
                    updatedAt: dateToString(quotation._doc.updatedAt),
                    servicePackageId: package.bind(this, quotation._doc.servicePackageId),
                    provinceId: province.bind(this, quotation._doc.provinceId),
                    cityId: city.bind(this, quotation._doc.cityId)
                };
            });

        }
        catch (err) {
            console.log(err);
        }
    },

    createQuotation: async (args) => {
        try {
            const quotation = new Quotation({
                firstName: args.quotationInput.firstName,
                lastName: args.quotationInput.lastName,
                emailAddress: args.quotationInput.emailAddress,
                phoneNumber: args.quotationInput.phoneNumber,
                isClosed: false,
                createdAt: newDate,
                updatedAt: newDate,
                servicePackageId: '5de581c845aa253bfcf63628',
                provinceId: '5de595b0b351803398b0090e',
                cityId: '5de58e7163a2a80fd4737eff'
            });

            let createdQuotation;
            try {
                const result = await quotation.save();
                console.log(result);
                createdQuotation = { ...result._doc };
                return createdQuotation;
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