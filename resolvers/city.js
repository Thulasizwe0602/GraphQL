
const City = require('../models/city');

module.exports = {
    cities: async () => {
        try {
            const cities = await City.find();
            return cities.map(city => {
                return { ...city._doc };
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    createCity: async args => {
        const city = new City({
            cityName: args.cityInput.cityName
        });

        try {
            const createdCity = await city.save();
            console.log(createdCity);
            return { ...createdCity._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};