import { Request, Response } from 'express';
import MatchesService from '../services/matches.services';

export default class MatchesController {
  static async getMatches(req: Request, res: Response) {
    const allMatches = await MatchesService.getMatches(req.query.inProgress as string);
    const { status, data } = allMatches;
    return res.status(status).json(data);
  }

  static async finishMatch(req: Request, res: Response) {
    const { matchId } = req.params;
    await MatchesService.finishMatch(matchId);
    return res.status(200).json({ message: 'Finished' });
  }

  static async updatedMatch(req: Request, res: Response) {
    const { matchId } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    await MatchesService.updatedMatch(matchId, homeTeamGoals, awayTeamGoals);
    return res.status(200).json({ message: 'Updated' });
  }

  static async createMatch(req: Request, res: Response) {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    const result = await MatchesService
      .createMatch(homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals);
    const { status, data } = result;
    return res.status(status).json(data);
  }
}
