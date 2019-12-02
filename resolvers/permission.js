const Permission = require('../models/permission');
const { dateToString } = require('../helpers/helper');

module.exports = {
    permissions: async () => {
        try {
            const permissions = await Permission.find();
            return permissions.map(permission => {
                return {
                    ...permission._doc,
                    createdAt: dateToString(permission._doc.createdAt)
                };
            });
        }
        catch (err) {
            console.log(err);
        }
    },

    createPermission: async args => {
        const permission = new Permission({
            permissionName: args.permissionInput.permissionName,
            createdAt: new Date().toISOString()
        });

        try {
            const result = await permission.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    },

    deletePermission: async args => {
        try {
            const permission = await Permission.findById(args.permissionInput.permissionId);
            if (permission) {
                await Permission.deleteOne({ id: args.permissionInput.permissionId });
            }
        } catch (err) {
            throw err;
        };
    }
}