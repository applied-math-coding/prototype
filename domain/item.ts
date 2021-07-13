export class Item{
  name: string;
  available: boolean;

  constructor({name, available}: Item){
    this.name = name;
    this.available = available;
  }
}
