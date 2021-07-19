export enum ItemQueryName {
  GetItems = 'getItems',
  GetItem = 'getItem',
  UpdateItem = 'updateItem',
  CreateItem = 'createItem',
  DeleteItem = 'deleteItem'
}

export class ItemQueries {
  static readonly [ItemQueryName.GetItems] = `{
    ${ItemQueryName.GetItems}{
      id,
      name,
      available
    }
  }`;

  static readonly [ItemQueryName.GetItem] = `query GetItem($id: Int!){
    ${ItemQueryName.GetItem}(id: $id){
      id,
      name,
      available
    }
  }`;

  static readonly [ItemQueryName.UpdateItem] = `mutation UpdateItem($id: Int!, $item: ItemInput){
    ${ItemQueryName.UpdateItem}(id: $id, item: $item){
      id,
      name,
      available
    }
  }`;

  static readonly [ItemQueryName.CreateItem] = `mutation CreateItem($id: Int!, $item: ItemInput){
    ${ItemQueryName.CreateItem}(id: $id, item: $item){
      id,
      name,
      available
    }
  }`;

  static readonly [ItemQueryName.DeleteItem] = `mutation DeleteItem($id: Int!, $item: ItemInput){
    ${ItemQueryName.DeleteItem}(id: $id)
  }`;
};