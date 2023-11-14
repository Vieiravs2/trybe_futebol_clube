import { Request, Response } from 'express';
import teamService from '../services/teams.services';

export default class TeamController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  }
}
