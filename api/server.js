const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const dotEnv = require('dotenv');
const DataLoader = require('dataloader');

const { verifyUser } = require('./helper/context');
const { connection } = require('./database/util');
const resolvers = require('./resolvers/index');
const typeDefs = require('./typeDefs/index');
const loaders = require('./loaders');

dotEnv.config();

const app = express();

connection();

app.use(cors());

app.use(express.json());

const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({ req, connection }) => {
        const contextObj = {};
        if(req) {
            await verifyUser(req);
            contextObj.email = req.email;
            contextObj.loggedInUserId = req.loggedInUserId; 
        }
        contextObj.loaders = {
            user: new DataLoader(keys => loaders.userLoader.batchUsers(keys))
        }
        return contextObj;
    },
});

apolloServer.applyMiddleware({ app, path: '/graphql' });

const PORT = process.env.PORT || 4000;

app.use('/', (req, res, next) => {
    res.send({message: 'Hello'});
});

const httpServer = app.listen(PORT, () => {
    console.log(`Server listening on PORT ${PORT}`);
    console.log(`Graphql Endpoint: ${apolloServer.graphqlPath}`);
});

apolloServer.installSubscriptionHandlers(httpServer);