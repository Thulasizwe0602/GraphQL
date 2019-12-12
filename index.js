const express = require('express');
const bodyParser = require('body-parser');
const graphqlHttp = require('express-graphql');
const cors = require('cors')

const mongoose = require('mongoose');

const graphiqlSchemas = require('./schemas/schema');
const graphiqlResolvers = require('./resolvers/mainResolver');
const isAuthorized = require('./middleware/authentication');
const app = express();

app.use(cors());
app.use(isAuthorized);
app.use('/api', graphqlHttp({
    schema: graphiqlSchemas,
    rootValue: graphiqlResolvers,
    graphiql: true
}));

mongoose.connect('mongodb+srv://sizwe:mdb@123@sizdb-4sjee.mongodb.net/lifecover?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        app.listen(5000);
        console.log("Server started at :", new Date().toString());
    })
    .catch(err => {
        console.log(err);
    });