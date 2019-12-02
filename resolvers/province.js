
const Province = require('../models/province');
const { cityList } = require('./resolverHelper');

module.exports = {
    provinces: async () => {
        try {
            const provinces = await Province.find();
            console.log(provinces);
            return provinces.map(province => {
                return {
                    ...province._doc,
                    _id: province.id,
                    cities: cityList.bind(this, province._doc.cities)
                };
            });
        }
        catch (err) {
            console.log(err);
        }
     },
     createProvince: async args => {
        const province = new Province({
            provinceName: args.provinceInput.provinceName,
            cities: args.provinceInput.cities
        });
        
        try {
            const result = await province.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};