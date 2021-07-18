import { ItemGraphqlService } from './item-graphql.service';
import { ItemService } from './item.service';

export const itemService = new ItemService();
export const itemGraphqlService = new ItemGraphqlService();