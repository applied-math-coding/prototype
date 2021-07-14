import { buildSchema } from 'graphql';

export const schema = buildSchema(`
input ItemInput {
  name: String
  available: Boolean
}

type Item {
  id: Int!
  name: String
  available: Boolean
}

type Query {
  getItem(id: Int!): Item
  getItems: [Item]
}

type Mutation {
  createItem(item: ItemInput): Item
  updateItem(id: Int!, item: ItemInput): Item
  deleteItem(id: Int!): Int
}
`);