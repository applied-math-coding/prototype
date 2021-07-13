import { Item } from '../domain/item';

export class ItemService {

  private itemStore: Item[] = []; // possible to use instead of db

  async findItem(id: number): Promise<Item> {
    //TODO
    return new Item({ name: '', available: true });
  }

  async deleteItem(id: number) {
    //TODO
  }

  async findAllItems(): Promise<Item[]> {
    //TODO
    return [];
  }

  async updateItem(it: Item): Promise<Item> {
    //TODO
    return it;
  }

  async createItem(it: Item): Promise<Item> {
    console.log(it)
    //TODO
    return it;
  }
}