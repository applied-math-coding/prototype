import { root } from './graph-api/root';
import { schema } from './graph-api/schema';
import express from 'express';
import { graphqlHTTP } from 'express-graphql';
import { itemsRouter } from './api/item-routes';

const app = express();

app.get('/', (_, res) => res.send('hello, all good.'));
app.use(express.json());
app.use('/api/items', itemsRouter);

app.use('/graph-api', graphqlHTTP({
  schema: schema,
  rootValue: root,
  graphiql: true
}));
app.listen(3000, () => console.log('app is running on port 3000'));