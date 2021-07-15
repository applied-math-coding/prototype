import { ItemService } from './item.service';
import { PersistentService } from './persistent.service';

export const persistentService = new PersistentService();
export const itemService = new ItemService();
