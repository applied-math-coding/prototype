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
    return this.db.manyOrNone<Item>('SELECT * FROM items');
  }

  async updateItem(id: number, it: Item): Promise<Item> {
    const condition = pgPromise().as.format(' WHERE id = ${id}', { id });
    const sql: string = pgPromise().helpers.update(it, null, 'items');
    return this.db.one(`${sql} ${condition} RETURNING *`);
  }

  async createItem(it: Item): Promise<Item> {
    const sql: string = pgPromise().helpers.insert(it, null, 'items');
    return this.db.one(`${sql} RETURNING *`);
  }
}