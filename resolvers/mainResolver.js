const userResolver = require('./user');
const userTypeResolver = require('./userType');
const permissionResolver = require('./permission');
const serviceResolver = require('./service');
const servicePackageResolver = require('./servicePackage');

const rootResolver = {
    ...userResolver,
    ...userTypeResolver,
    ...permissionResolver,
    ...serviceResolver,
    ...servicePackageResolver
};

module.exports = rootResolver;