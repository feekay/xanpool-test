import express from 'express';
import * as http from 'http';

import * as winston from 'winston';
import * as expressWinston from 'express-winston';
import cors from 'cors';
import { CommonRoutesConfig } from './common/common.routes.config';
import debug from 'debug';
import { PairsRouteConfig } from './routes/pair-routes';
import { PairsController } from './controllers/pairs-controller';
import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import { cacheFillService, pairService } from './provider';
import { errorHandlder } from './error-handler';
import { HOST, PORT } from './config';

import * as cron from 'node-cron';

const app: express.Application = express();
const server: http.Server = http.createServer(app);
const port = PORT;
const routes: Array<CommonRoutesConfig> = [];
const debugLog: debug.IDebugger = debug('app');

app.use(express.json());

app.use(cors());

const loggerOptions: expressWinston.LoggerOptions = {
  transports: [new winston.transports.Console()],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.prettyPrint(),
    winston.format.colorize({ all: true })
  )
};

if (!process.env.DEBUG) {
  loggerOptions.meta = false;
}

app.use(expressWinston.logger(loggerOptions));

const pairsController = new PairsController(pairService);

// HTTP ROUTES
routes.push(new PairsRouteConfig(app, pairsController));
routes.forEach((route: CommonRoutesConfig) => {
  route.configureRoutes();
  debugLog(`Routes configured for ${route.getName()}`);
});
// Custom Error handler
app.use(errorHandlder);

const runningMessage = `Server running at http://${HOST}:${port}`;
export default app;

server.listen(PORT, HOST, () => {
  // Fill cache on server start
  cacheFillService.execute();
  console.log(runningMessage);
});

// Schedule caching hourly
cron.schedule('* */1 * * *', () => {
  cacheFillService.execute();
});

// GRAPHQL Server
const schema = buildSchema(`
  type Query {
    rate(base: String!, symbol: String!): Pair
  }

  type Pair {
    name: String
    rate: Float
    time: Int
  }
`);

const root = {
  hello: async (args: any) => {
    return await pairService.getPair(args.base, args.symbol);
  }
};

app.use(
  '/graphql',
  graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
  })
);
app.listen(4000, HOST, () => {
  console.log(`Running a GraphQL API server at http://${HOST}:4000/graphql`);
});
