const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const  { buildSchema } = require('graphql');
const mongoose = require('mongoose');
const Permission = require('./models/permissions');

const app = express();

 
app.use(bodyParser.json());

app.use('/api', graphqlHttp({
    schema: buildSchema(`

        type Permission {
            _id: ID!
            permissionName: String!
            createdAt: String
        }
 
        input PermissionInput {
            permissionName: String!
            createdAt: String
        }

        type RootQuery {
            permissions: [Permission]
        }
        type RootMutation {
            createPermission(permissionInput: PermissionInput): Permission
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