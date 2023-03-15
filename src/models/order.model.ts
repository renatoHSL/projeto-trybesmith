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
      SELECT o.id, o.user_id AS userId,
      JSON_EXTRACT(CONCAT('[', GROUP_CONCAT(p.id SEPARATOR ','), ']'), '$') AS productsIds 
      FROM Trybesmith.orders AS o
      JOIN Trybesmith.products AS p ON o.id = p.order_id
      GROUP BY o.id, o.user_id
    `,
    );
    const [rows] = result;
    return rows as Order[];
  }  
}