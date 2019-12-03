const { buildSchema } = require('graphql');
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
            email: String!
            password: String
            phoneNumber: String
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

        type City {
            _id: ID!
            cityName: String!
        }

        type Province {
            _id: ID!            
            provinceName: String!
            cities: [City!]!
        }

        type Quotation {
            _id: ID!
            firstName: String!
            lastName: String!
            emailAddress: String
            phoneNumber: String!
            isClosed: Boolean
            createdAt: String
            updatedAt: String
            servicePackageId: ServicePackage!
            provinceId: Province!            
            cityId: City!
        }

        type Department {
            _id: ID!
            departmentName: String!
            createdAt: String!
            updatedAt: String!
            lineManagerId: User!
        }

        type FeedbackType {
            _id: ID!
            feedbackTypeName: String!
        }        

        type Title {
            _id: ID!
            titleName: String!
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
            email: String!
            password: String!
            phoneNumber: String
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

        input CityInput {
            cityName: String!
        }

        input ProvinceInput {
            provinceName: String!
            cities: [String!]!
        }

        input QuotationInput {
            firstName: String!
            lastName: String!
            emailAddress: String
            phoneNumber: String!
            isClosed: Boolean
            createdAt: String
            updatedAt: String
            servicePackageId: String
            provinceId: String
            cityId: String        
        }

        input DepartmentInput {
            departmentName: String!
            createdAt: String
            updatedAt: String
            lineManagerId: String
        }

        input FeedbackTypeInput {
            feedbackTypeName: String!
        }

        input TitleInput {
            titleName: String!
        }

        type RootQuery {
            permissions: [Permission]
            userTypes: [UserType]            
            users: [User]
            login(emailAddress: String!, password: String!): AuthData
            services: [Service]
            servicePackages: [ServicePackage]
            cities: [City]
            provinces: [Province]
            quotations: [Quotation]
            departments: [Department]
            feedbackTypes: [FeedbackType]
            titles: [Title]    
        }

        type RootMutation {
            createPermission(permissionInput: PermissionInput): Permission
            createUserType(userTypeInput: UserTypeInput): UserType
            createUser(userInput: UserInput): User
            createService(serviceInput: ServiceInput): Service
            createServicePackage(servicePackageInput: ServicePackageInput): ServicePackage
            createCity(cityInput: CityInput): City
            createProvince(provinceInput: ProvinceInput): Province
            createQuotation(quotationInput: QuotationInput): Quotation
            createDepartment(departmentInput: DepartmentInput): Department
            createFeedbackType(feedbackTypeInput: FeedbackTypeInput): FeedbackType
            createTitle(titleInput: TitleInput): Title
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `);