import connection from '../models/connection';
import ItemModel from '../models/item.model';
import Item from '../interfaces/item.interface';

class ItemService {
  public model: ItemModel;

  constructor() {
    this.model = new ItemModel(connection);
  }

  public async getAll(): Promise<Item[]> {
    const items = await this.model.getAll();
    return items;
  }
}

export default ItemService;