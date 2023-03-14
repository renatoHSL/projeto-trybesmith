// ./models/book.model.ts

import { Pool } from 'mysql2/promise';
import Order from '../interfaces/order.interface';

export default class OrderModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Order[]> {
    const result = await this.connection.execute(
      `
      SELECT orders.id, orders.user_id As userId, JSON_ARRAYAGG(products.id) AS productsIds 
      FROM Trybesmith.orders AS orders
      LEFT JOIN Trybesmith.products AS products ON orders.id = products.order_id`,
    );
    const [rows] = result;
    return rows as Order[];
  }  
}