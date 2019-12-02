const userResolver = require('./user');
const userTypeResolver = require('./userType');
const permissionResolver = require('./permission');

const rootResolver = {
    ...userResolver,
    ...userTypeResolver,
    ...permissionResolver
};

module.exports = rootResolver;