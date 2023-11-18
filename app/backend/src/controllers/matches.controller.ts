import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  static async getAllMatches(req: Request, res: Response) {
    const teams = await MatchesService.getAllMatches();
    return res.status(200).json(teams);
  }
}
