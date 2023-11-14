import { Request, Response, NextFunction } from 'express';

export default class Validations {
  static async validateEmailAndPassword(req: Request, res: Response, next: NextFunction) {
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const { email, password } = req.body;
    const condPassword = password.length >= 6;
    const condEmail = !regexEmail.test(email);

    if (!email || !password || condPassword || condEmail) {
      return res.status(400).json(
        { message: 'All fields must be filled' },
      );
    }

    next();
  }
}
