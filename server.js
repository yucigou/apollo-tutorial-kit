import express from 'express';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import bodyParser from 'body-parser';
import schema from './data/schema';
import compression from 'compression';
import { Engine } from 'apollo-engine';

const GRAPHQL_PORT = 3000;

// This is a key that we've set up specifically for this tutorial.
// You can put your own key here if you sign up for a free account at
// engine.apollographql.com
const ENGINE_API_KEY = 'service:mdg-private-a-service:EB-LWSjPdZX0ph-Yyn2cxA';

// Apollo Engine configuration for caching and performance monitoring
const engine = new Engine({
  engineConfig: {
    apiKey: ENGINE_API_KEY,
    logging: {
      level: 'DEBUG'
    },
    stores: [
      {
        name: 'inMemEmbeddedCache',
        inMemory: {
          cacheSize: 10485760
        }
      }
    ],
    queryCache: {
      publicFullQueryStore: 'inMemEmbeddedCache'
    }
  },
  graphqlPort: GRAPHQL_PORT || process.env.PORT,
  endpoint: '/graphql',
  dumpTraffic: true
});

engine.start();

const graphQLServer = express();

graphQLServer.use(engine.expressMiddleware());

graphQLServer.use(
  '/graphql',
  bodyParser.json(),
  graphqlExpress({ schema, tracing: true, cacheControl: true })
);
graphQLServer.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }));

graphQLServer.use(compression());

graphQLServer.listen(GRAPHQL_PORT, () =>
  console.log(
    `GraphiQL is now running on http://localhost:${GRAPHQL_PORT}/graphiql`
  )
);
