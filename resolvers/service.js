
const Service = require('../models/service');

module.exports = {
    services: async () => {
        try {
            const services = await Service.find();
            return services.map(service => {
                return { ...service._doc };
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    createService: async args => {
        const service = new Service({
            serviceName: args.serviceInput.serviceName
        });

        try {
            const result = await service.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};