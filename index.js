const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const  { buildSchema } = require('graphql');
const bcrypt = require('bcryptjs');

const mongoose = require('mongoose');

const Permission = require('./models/permission');
const User = require('./models/user');
const UserType = require('./models/userType');

const app = express();

const userTypeFindById = userTypeId => {
    return UserType.findById(userTypeId)
    .then(userType => {
        return {...userType._doc}
    })
    .catch(err => {
        console.log(err);
    });
}

const permissionFindById = permissionId => {
    return Permission.findById(permissionId)
    .then(permission => {
        return {...permission._doc}
    })
    .catch(err => {
        console.log(err);
    });
}
 
app.use(bodyParser.json());

app.use('/api', graphqlHttp({
    schema: buildSchema(`

        type Permission {
            _id: ID!
            permissionName: String!
            createdAt: String
        }
        type UserType {
            _id: ID!
            userTypeName: String!
        }
        type User {
            _id: ID!
            firstName: String!
            lastName: String!
            emailAddress: String!
            password: String
            cellPhoneNumber: String
            isProfileUpdated: Boolean
            isActive: Boolean
            createdAt: String
            updatedAt: String
            userTypeId: UserType!
            permissionId: Permission!
        }
        
        input PermissionInput {
            permissionName: String!
            createdAt: String
        }
        input UserTypeInput {
            userTypeName: String!
        }
        input UserInput {
            firstName: String!
            lastName: String!
            emailAddress: String!
            password: String!
            cellPhoneNumber: String
            isProfileUpdated: Boolean
            isActive: Boolean
            createdAt: String
            updatedAt: String
            userTypeId: String
            permissionId: String
        }

        type RootQuery {
            permissions: [Permission]
            userTypes: [UserType]            
            users: [User]
        }
        type RootMutation {
            createPermission(permissionInput: PermissionInput): Permission
            createUserType(userTypeInput: UserTypeInput): UserType
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    
    rootValue: {
        permissions: () => {
           return Permission.find()
           .then(permissions =>{
               return permissions
               .map(permission => {
                   return {...permission._doc};
               });
           }).catch(err => {
               console.log(err);
           });
        },
        userTypes: () => {
            return UserType.find()
            .then(userTypes =>{
                return userTypes
                .map(userType => {
                    return {...userType._doc};
                });
            }).catch(err => {
                console.log(err);
            });
         },         
        users: () => {
            return User.find()
            .then(users =>{
                return users
                .map(user => {
                    return {
                        ...user._doc,
                        _id: user.id,
                        userTypeId: userTypeFindById.bind(this, user._doc.userTypeId),
                        permissionId: permissionFindById.bind(this, user._doc.permissionId)
                    };
                });
            }).catch(err => {
                console.log(err);
            });
         },

        createPermission: args => {
            const permission = new Permission({
                permissionName: args.permissionInput.permissionName,
                createdAt: new Date().toISOString()
            });
            
            return permission.save().
            then(result => { 
                console.log(result);
                return {...result._doc};
            })
            .catch(err => { 
                console.log(err);
                throw err;
            });
        },
        createUserType: args => {
            const userType = new UserType({
                userTypeName: args.userTypeInput.userTypeName
            });
            
            return userType.save().
            then(result => { 
                console.log(result);
                return {...result._doc};
            })
            .catch(err => { 
                console.log(err);
                throw err;
            });
        },
        createUser: args => {  
            return User.findOne({ emailAddress: args.userInput.emailAddress })
            .then(duplicateUser => {

                if(duplicateUser) {                    
                    throw new Error('Email address already exist in the system.');
                }
                return bcrypt.hash(args.userInput.password, 12)
            })
            .then(encryptedPassword => {                
                console.log("Successfully encrypted your password");            
                const user = new User({
                    firstName: args.userInput.firstName,
                    lastName: args.userInput.lastName,
                    emailAddress: args.userInput.emailAddress,
                    password: encryptedPassword,
                    cellphoneNumber: args.userInput.cellphoneNumber,
                    isProfileUpdated: args.userInput.isProfileUpdated,
                    isActive: args.userInput.isActive,
                    createdAt: new Date().toISOString(),
                    updatedAt: new Date().toISOString(),
                    userTypeId: '5de3d5650ed14e442c93402e',
                    permissionId: '5de3c0d7bc849a4cb0088bf3',
                });
                
                let createdUser;
                return user.save()
                .then(result => {
                    console.log(result);
                    createdUser = {...result._doc, password: null};
                    return createdUser;
                })
                .catch(err => { 
                    console.log(err);
                    throw err;
                });
            })
            .catch(err => {
                console.log(err);
                throw err;              
            });
        }

    },
    graphiql: true
}));

mongoose.connect('mongodb+srv://sizwe:mdb@123@sizdb-4sjee.mongodb.net/lifecover?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
.then(() => {
    app.listen(3000);
    console.log("Server started at :", new Date().toString()); 
})
.catch(err => {
    console.log(err);
});