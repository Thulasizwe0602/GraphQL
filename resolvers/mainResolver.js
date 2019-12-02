const userResolver = require('./user');
const userTypeResolver = require('./userType');
const permissionResolver = require('./permission');
const serviceResolver = require('./service');
const servicePackageResolver = require('./servicePackage');
const cityResolver = require('./city');
const provinceResolver = require('./province');

const rootResolver = {
    ...userResolver,
    ...userTypeResolver,
    ...permissionResolver,
    ...serviceResolver,
    ...servicePackageResolver,
    ...cityResolver,
    ...provinceResolver
};

module.exports = rootResolver;