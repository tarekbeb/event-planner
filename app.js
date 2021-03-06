const express = require('express');
const bodyParser = require('body-parser');
const { graphqlHTTP } = require('express-graphql');
const mongoose = require('mongoose');
const isAuth = require('./middleware/is-auth');

const graphQlSchema = require('./graphql/schema/index');
const graphQlResolvers = require('./graphql/resolvers/index');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'content-Type, Authorization');
  if(req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  next();
});

app.use(isAuth);

app.use(
  '/graphql',
  graphqlHTTP({
    schema: graphQlSchema,
    rootValue: graphQlResolvers,
    graphiql: true
  })
);

const { MONGO_DB, MONGO_PASSWORD, MONGO_USER } = process.env;	
const clusterAddress = `mongodb+srv://${MONGO_USER}:${MONGO_PASSWORD}@cluster0.ch44h.azure.mongodb.net/${MONGO_DB}?retryWrites=true&w=majority`;

mongoose
  .set('useUnifiedTopology', true)
  .connect(clusterAddress, { useNewUrlParser: true })
  .then(() => {
    app.listen(8000);
  })
  .catch(err => {
    console.log(err);
  });
