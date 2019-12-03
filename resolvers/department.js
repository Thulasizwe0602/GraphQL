
const Department = require('../models/department');
const { user } = require('./resolverHelper');
const newDate = new Date().toISOString();
const { dateToString } = require('../helpers/helper');

module.exports = {
    departments: async () => {
        try {
            const departments = await Department.find();
            return departments.map(department => {
                return { 
                    ...department._doc,
                    departmentName: department.departmentName,
                    createdAt: dateToString(department._doc.createdAt),
                    updatedAt: dateToString(department._doc.updatedAt),
                    lineManagerId: user.bind(this, department._doc.lineManagerId),
                 };
            });
        }
        catch (err) {
            console.log(err);
        }
    },
    createDepartment: async args => {
        const department = new Department({
            departmentName: args.departmentInput.departmentName,
            createdAt: newDate,
            updatedAt: newDate,
            lineManagerId: '5de624d19a26fc1fe0ab1360'
        });

        try {
            const result = await department.save();
            console.log(result);
            return { ...result._doc };
        }
        catch (err) {
            console.log(err);
            throw err;
        }
    }
};