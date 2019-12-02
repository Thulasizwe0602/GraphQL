const jwt = require('jsonwebtoken');
const { dateToString, privateKey } = require('../helpers/helper');

module.exports = (request, response, next) => {
    const authHeader = request.get('Authorization');
    if (!authHeader) {
        request.isAuthorized = false;
        return next();
    }

    const token = authHeader.split(' ')[1];

    if (!token || token === '') {
        request.isAuthorized = false;
        return next();
    }

    let decodedToken;
    try {
        decodedToken = jwt.verify(token, privateKey);
    } catch (err) {
        request.isAuthorized = false;
        return next();
    }

    if (!decodedToken) {
        request.isAuthorized = false;
        return next();
    }

    request.isAuthorized = true;
    request.userId = decodedToken.userId;
    request.permissionId = decodedToken.permissionId;
    request.userTypeId = decodedToken.userTypeId;

    next();
};