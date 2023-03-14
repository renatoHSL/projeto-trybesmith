import { Router } from 'express';
import ItemController from '../controllers/item.controller';

const router = Router();

const itemsController = new ItemController();

router.get('/products', itemsController.getAll);

export default router;