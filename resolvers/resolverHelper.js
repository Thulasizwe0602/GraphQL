const UserType = require('../models/userType');
const Permission = require('../models/permission');
const Service = require('../models/service');
const City = require('../models/city');

const {dateToString} = require('../helpers/helper');


const userTypeFindById = async userTypeId => {
    try {
        const userType = await UserType.findById(userTypeId);
        return { ...userType._doc };
    }
    catch (err) {
        console.log(err);
    }
}

const permissionFindById = async permissionId => {
    try {
        const permission = await Permission.findById(permissionId);
        return {
            ...permission._doc,
            createdAt: dateToString(permission._doc.createdAt)
        };
    }
    catch (err) {
        console.log(err);
    }
}

const serviceFindById = async serviceIds => {
    return await Service.find({_id: {$in:serviceIds}})
    .then(services => {
        return services.map(service => {
            return {
                ...service._doc,
                _id: service.id,
                serviceName: service.serviceName
            }
        });
    })
    .catch(err => {
        throw new Error(err);
    });

    
}

const cityFindById = async cityIds => {
    return await City.find({_id: {$in:cityIds}})
    .then(cities => {
        return cities.map(city => {
            return {
                ...city._doc,
                _id: city.id,
                cityName: city.cityName
            }
        });
    })
    .catch(err => {
        throw new Error(err);
    });

    
}

exports.userType = userTypeFindById;
exports.permission = permissionFindById;
exports.serviceList = serviceFindById;
exports.cityList = cityFindById;