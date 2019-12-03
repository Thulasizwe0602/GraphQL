const UserType = require('../models/userType');
const Permission = require('../models/permission');
const Service = require('../models/service');
const ServicePackage = require('../models/servicePackage');
const Province = require('../models/province');
const City = require('../models/city');
const User = require('../models/user');
const Gender = require('../models/gender');
const Title = require('../models/title');

const { dateToString } = require('../helpers/helper');


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
    return await Service.find({ _id: { $in: serviceIds } })
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

const citiesFindById = async cityIds => {
    return await City.find({ _id: { $in: cityIds } })
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

const servicePackageFindById = async servicePackageId => {
    try {
        const package = await ServicePackage.findById(servicePackageId);
        return {
            ...package._doc
        };
    }
    catch (err) {
        console.log(err);
    }
}

const provinceFindById = async provinceId => {
    try {
        const province = await Province.findById(provinceId);
        return {
            ...province._doc
        };
    }
    catch (err) {
        console.log(err);
    }
}

const cityFindById = async cityId => {
    try {
        const city = await City.findById(cityId);
        return {
            ...city._doc
        };
    }
    catch (err) {
        console.log(err);
    }
}

const userFindById = async userId => {
    try {
        const user = await User.findById(userId);
        return { ...user._doc };
    }
    catch (err) {
        console.log(err);
    }
}

const genderFindById = async genderId => {
    try {
        const gender = await Gender.findById(genderId);
        return { ...gender._doc };
    }
    catch (err) {
        console.log(err);
    }
}

const titleFindById = async titleId => {
    try {
        const title = await Title.findById(titleId);
        return { ...title._doc };
    }
    catch (err) {
        console.log(err);
    }
}

exports.userType = userTypeFindById;
exports.permission = permissionFindById;
exports.serviceList = serviceFindById;
exports.cityList = citiesFindById;
exports.package = servicePackageFindById;
exports.province = provinceFindById;
exports.city = cityFindById;
exports.user = userFindById;
exports.title = titleFindById;
exports.gender = genderFindById;