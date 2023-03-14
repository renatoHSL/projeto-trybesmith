import { Pool, ResultSetHeader } from 'mysql2/promise';
import Item from '../interfaces/item.interface';

export default class ItemModel {
  public connection: Pool;

  constructor(connection: Pool) {
    this.connection = connection;
  }

  public async getAll(): Promise<Item[]> {
    const result = await this.connection.execute('SELECT * FROM Trybesmith.products');
    const [rows] = result;
    return rows as Item[];
  }

  public async create(item: Item): Promise<Item> {
    const { name, amount } = item;
    const result = await this.connection.execute<ResultSetHeader>(
      'INSERT INTO Trybesmith.products (name, amount) VALUES (?, ?)',
      [name, amount],
    );
    const [dataInserted] = result;
    const { insertId } = dataInserted;
    return { id: insertId, ...item };
  }
}
