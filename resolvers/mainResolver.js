const userResolver = require('./user');
const userTypeResolver = require('./userType');
const permissionResolver = require('./permission');
const serviceResolver = require('./service');
const servicePackageResolver = require('./servicePackage');
const cityResolver = require('./city');
const provinceResolver = require('./province');
const quotationResolver = require('./quotation');

const rootResolver = {
    ...userResolver,
    ...userTypeResolver,
    ...permissionResolver,
    ...serviceResolver,
    ...servicePackageResolver,
    ...cityResolver,
    ...provinceResolver,
    ...quotationResolver
};

module.exports = rootResolver;