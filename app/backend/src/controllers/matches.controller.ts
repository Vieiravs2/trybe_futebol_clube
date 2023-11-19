import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  static async getMatches(req: Request, res: Response) {
    const allMatches = await MatchesService.getMatches(req.query.inProgress as string);
    const { status, data } = allMatches;
    return res.status(status).json(data);
  }
}
