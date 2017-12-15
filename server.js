import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
import { Engine } from 'apollo-engine';

const GRAPHQL_PORT = 3000;
const graphQLServer = express();

const engine = new Engine({
    engineConfig: {
        apiKey: "service:mdg-private-a-service:EB-LWSjPdZX0ph-Yyn2cxA",
        logging: {
            level: 'DEBUG'
        },
        stores: [
            {
                name: "inMemEmbeddedCache",
                "inMemory": {
                    "cacheSize": 10485760
                }
            }
        ],
        queryCache: {
            "publicFullQueryStore": "inMemEmbeddedCache"
        }
    },
    graphqlPort: GRAPHQL_PORT || process.env.PORT,
    endpoint: '/graphql',
    dumpTraffic: true
});

engine.start();

graphQLServer.use(engine.expressMiddleware());
graphQLServer.use('/graphql', bodyParser.json(), graphqlExpress({ schema, tracing: true, cacheControl: true }));
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.use(compression());


graphQLServer.listen(GRAPHQL_PORT, () => console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
));

