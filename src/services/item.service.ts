import connection from '../models/connection';
import ItemModel from '../models/item.model';
import Item from '../interfaces/item.interface';
// import { BadRequestError } from 'restify-errors';

class ItemService {
  public model: ItemModel;

  constructor() {
    this.model = new ItemModel(connection);
  }

  public async getAll(): Promise<Item[]> {
    const items = await this.model.getAll();
    return items;
  }

  public async create(item: Item): Promise<Item> {
    const result = await this.model.create(item);
    return result;
  }
}

export default ItemService;