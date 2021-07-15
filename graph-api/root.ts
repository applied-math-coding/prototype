import { itemService } from '../services';
import { Item } from '../domain/item';

export const root = {
  getItem: async ({ id }: { id: number }): Promise<Item> => itemService.findItem(id),
  getItems: async (): Promise<Item[]> => itemService.findAllItems(),
  createItem: async ({ item }: { item: Item }): Promise<Item> => itemService.createItem(item),
  updateItem: async ({ id, item }: { id: number; item: Item }): Promise<Item> => itemService.updateItem(id, item),
  deleteItem: async ({ id }: { id: number }): Promise<number> => itemService.deleteItem(id)
};