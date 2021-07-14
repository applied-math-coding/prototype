export class Item{
  id?: number;
  name: string;
  available: boolean;

  constructor({id, name, available}: Item){
    this.id = id;
    this.name = name;
    this.available = available;
  }
}
