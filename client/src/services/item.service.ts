import { Item } from '@/domain/item';
import { reactive } from 'vue';
import { graphqlService } from '.';
import { ItemQueries, ItemQueryName } from './item.queries';

export class ItemService {
  readonly BASE_URL = '/api/items';

  state = reactive({ useGraphQL: false });

  async getItem(id: number): Promise<Item> {
    return this.state.useGraphQL
      ? graphqlService.createRequest(ItemQueries.getItem, ItemQueryName.GetItem, { id })
      : fetch(`${this.BASE_URL}/${encodeURIComponent(id)}`)
        .then(r => r.json());
  }

  async getItems(): Promise<Item[]> {
    return this.state.useGraphQL
      ? graphqlService.createRequest(ItemQueries.getItems, ItemQueryName.GetItems)
      : fetch(`${this.BASE_URL}`).then(r => r.json());
  }

  async deleteItem(id: number): Promise<void> {
    return this.state.useGraphQL
      ? graphqlService.createRequest(ItemQueries.deleteItem, ItemQueryName.DeleteItem, { id })
      : fetch(`${this.BASE_URL}/${encodeURIComponent(id)}`, {
        method: 'DELETE'
      }).then(() => undefined);
  }

  async createItem(item: Item): Promise<Item> {
    return this.state.useGraphQL
      ? graphqlService.createRequest(ItemQueries.createItem, ItemQueryName.CreateItem, { item })
      : fetch(`${this.BASE_URL}`, {
        method: 'POST',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(r => r.json());
  }

  async updateItem(item: Item): Promise<Item> {
    return this.state.useGraphQL
      ? graphqlService.createRequest(ItemQueries.updateItem, ItemQueryName.UpdateItem, { item })
      : fetch(`${this.BASE_URL}`, {
        method: 'PUT',
        body: JSON.stringify(item),
        headers: {
          'Content-Type': 'application/json'
        },
      }).then(r => r.json());
  }
}