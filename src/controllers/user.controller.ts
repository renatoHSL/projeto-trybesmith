import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import statusCodes from '../../statusCodes';
import UserService from '../services/user.service';

require('dotenv/config');

const jwtToken = {
  expiresIn: '30d',
  algorithm: 'HS256',
};

const secret = 'senhaSuperSecreta';

class UserController {
  constructor(private userService = new UserService()) { }

  public create = async (req: Request, res: Response) => {
    const user = req.body;

    const userCreated = await this.userService.create(user);
    const token = jwt.sign({ data: { ...userCreated } }, secret, jwtToken as any);
    res.status(statusCodes.CREATED).json({ token });
  };
}

export default UserController;