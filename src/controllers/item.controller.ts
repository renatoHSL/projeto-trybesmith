import { Request, Response } from 'express';
import statusCodes from '../../statusCodes';
import ItemService from '../services/item.service';

class ItemController {
  constructor(private itemService = new ItemService()) { }

  public getAll = async (_req: Request, res: Response) => {
    const items = await this.itemService.getAll();
    res.status(statusCodes.OK).json(items);
  };
}

export default ItemController;