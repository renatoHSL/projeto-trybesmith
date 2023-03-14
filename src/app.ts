import express, { NextFunction, Request, Response } from 'express';
import statusCodes from '../statusCodes';
import 'express-async-errors';
import ItemsRoutes from './routes/items.routes';

const app = express();

app.use(express.json());

const PORT = 3001;

app.get('/', (_req, res) => {
  res.status(statusCodes.OK).send('Projeto Trybesmith');
});

app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  const { name, message, details } = err as any;
  switch (name) {
    case 'BadRequestError':
      res.status(400).json({ message });
      break;
    case 'ValidationError':
      res.status(400).json({ message: details[0].message });
      break;
    case 'NotFoundError':
      res.status(404).json({ message });
      break;
    case 'ConflictError':
      res.status(409).json({ message });
      break;
    default:
      res.sendStatus(500);
  }
  next();
});

app.use(ItemsRoutes);

app.listen(PORT, () => console.log(
  `Server is running on PORT: ${PORT}`,
));

export default app;
