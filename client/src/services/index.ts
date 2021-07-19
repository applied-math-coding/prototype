import { GraphqlService } from './graphql.service';
import { ItemService } from './item.service';

export const itemService = new ItemService();
export const graphqlService = new GraphqlService();