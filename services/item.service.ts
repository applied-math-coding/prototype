import pgPromise from 'pg-promise';
import { persistentService } from '.';
import { Item } from '../domain/item';

export class ItemService {

  private itemStore: Item[] = []; // possible to use instead of db
  private db: pgPromise.IDatabase<any>;

  constructor() {
    this.db = persistentService.db;
  }

  async findItem(id: number): Promise<Item> {
    return this.db.one<Item>('SELECT * FROM items WHERE id = $1', [id]);
  }

  async deleteItem(id: number): Promise<number> {
    this.db.none('DELETE FROM items WHERE id = $1', [id]);
    return id;
  }

  async findAllItems(): Promise<Item[]> {
    return this.db.many<Item>('SELECT * FROM items');
  }

  async updateItem(it: Item): Promise<Item> {
    debugger //TODO
    if (it.id == null) {
      throw new Error('item is missing an id field');
    }
    const sql: string = pgPromise().helpers.update(it, null, 'items');
    await this.db.none(sql);
    return this.findItem(it.id);
  }

  async createItem(it: Item): Promise<Item> {
    console.log(it)
    //TODO
    return { ...it, id: 1 };
  }
}