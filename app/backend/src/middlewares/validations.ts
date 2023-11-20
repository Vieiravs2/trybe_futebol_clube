import { Request, Response, NextFunction } from 'express';
import validator from 'validator';
import JWT from '../utils/JWT';

export default class Validations {
  static validateLogin(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;

    if (!email || !password) return res.status(400).json({ message: 'All fields must be filled' });

    next();
  }

  static validateEmail(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    if (!validator.isEmail(email)) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validatePassword(req: Request, res: Response, next: NextFunction) {
    const { password } = req.body;

    if (!validator.isLength(password, { min: 6 })) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    next();
  }

  static validateToken(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization;

    if (!token) return res.status(401).json({ message: 'Token not found' });

    try {
      const tokenReplace = token.replace('Bearer ', '');
      const decoded = JWT.verifyToken(tokenReplace);
      req.body.user = decoded;
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }

    next();
  }

  static validateTeamsInCreateMatch(req: Request, res: Response, next: NextFunction) {
    const { homeTeamId, awayTeamId } = req.body;
    return homeTeamId === awayTeamId ? res.status(422).json(
      { message: 'It is not possible to create a match with two equal teams' },
    )
      : next();
  }
}
