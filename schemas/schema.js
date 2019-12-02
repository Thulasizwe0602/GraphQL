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
        type AuthData {
            userId: ID!
            token: String!
            expiration: Int!            
            userTypeId: String!
            permissionId: String!
        }

        type Service {
            _id: ID!
            serviceName: String!
        }

        type ServicePackage {
            _id: ID!            
            servicePackageName: String!
            services: [Service!]!
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

        input ServiceInput {
            serviceName: String!
        }

        input ServicePackageInput {
            servicePackageName: String!
            services: [String!]!
        }

        type RootQuery {
            permissions: [Permission]
            userTypes: [UserType]            
            users: [User]
            login(emailAddress: String!, password: String!): AuthData
            services: [Service]
            servicePackages: [ServicePackage]
        }

        type RootMutation {
            createPermission(permissionInput: PermissionInput): Permission
            createUserType(userTypeInput: UserTypeInput): UserType
            createUser(userInput: UserInput): User
            createService(serviceInput: ServiceInput): Service            
            createServicePackage(servicePackageInput: ServicePackageInput): ServicePackage
            deletePermission(permissionInput: PermissionInput) : Permission
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);