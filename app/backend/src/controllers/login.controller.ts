import { Request, Response } from 'express';
import loginService from '../services/login.services';

export default class LoginController {
  static async login(req: Request, res: Response) {
    const { email, password } = req.body;
    const { status, data } = await loginService.login(email, password);
    return res.status(status).json(data);
  }
}