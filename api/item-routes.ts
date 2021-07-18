import { HttpStatus } from '../domain/http-status.enum';
import express from 'express';
import { itemService } from '../services';

const itemsRouter = express.Router();

itemsRouter.get(['/:itemId', '/'], async (req, res) =>
  res.json(
    await (req.params.itemId != null ?
      itemService.findItem(+req.params.itemId) :
      itemService.findAllItems())
  )
);

itemsRouter.post('/', async (req, res) => res.json(await itemService.createItem(req.body)));

itemsRouter.put('/', async (req, res) => {
  const { id, ...item } = req.body; // ensure the item is dropped before giving to db
  res.json(await itemService.updateItem(id, item));
});

itemsRouter.delete('/:itemId', async (req, res) => {
  await itemService.deleteItem(+req.params.itemId);
  res.sendStatus(HttpStatus.OK);
});

export { itemsRouter };
