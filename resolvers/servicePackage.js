
const ServicePackage = require('../models/servicePackage');
const { serviceList } = require('./resolverHelper');

module.exports = {
    servicePackages: async () => {
        try {
            const packages = await ServicePackage.find();
            console.log(packages);
            return packages.map(package => {
                return {
                    ...package._doc,
                    _id: package.id,
                    services: serviceList.bind(this, package._doc.services)
                };
            });
        }
        catch (err) {
            console.log(err);
        }
     },
     createServicePackage: async args => {
        const servicePackage = new ServicePackage({
            servicePackageName: args.servicePackageInput.servicePackageName,
            services: args.servicePackageInput.services
        });
        
        try {
            const result = await servicePackage.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};