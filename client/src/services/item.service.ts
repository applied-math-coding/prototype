import { Item } from '@/domain/item';

export class ItemService {
  readonly BASE_URL = '/api/items';

  async getItems(): Promise<Item[]> {
    return fetch(`${this.BASE_URL}`).then(r => r.json());
  }

  async deleteItem(id: number): Promise<void> {
    return fetch(`${this.BASE_URL}/${encodeURIComponent(id)}`, {
      method: 'DELETE'
    }).then(() => undefined);
  }

  async createItem(item: Item): Promise<Item> {
    return fetch(`${this.BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(r => r.json());
  }

  async updateItem(item: Item): Promise<Item> {
    return fetch(`${this.BASE_URL}`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json'
      },
    }).then(r => r.json());
  }
}