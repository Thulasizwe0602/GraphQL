const  { buildSchema } = require('graphql');
module.exports = buildSchema(`
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
    `);