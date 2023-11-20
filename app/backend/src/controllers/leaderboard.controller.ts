import { Request, Response } from 'express';
import LeaderboardService from '../services/leaderboard.services';

export default class LoginController {
  static async getHomeLeaderboard(req: Request, res: Response) {
    const allMatches = await LeaderboardService.getHomeLeaderboard();
    const { status, data } = allMatches;
    return res.status(status).json(data);
  }
}
