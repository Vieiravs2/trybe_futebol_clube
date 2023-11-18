import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const teams = await MatchesService.getAllMatches();
    const { status, data } = teams;
    return res.status(status).json(data);
  }
}
