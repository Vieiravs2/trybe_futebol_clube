import { Request, Response } from 'express';
import teamService from '../services/teams.services';

export default class TeamController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await teamService.getAllTeams();
    const { status, data } = teams;
    return res.status(status).json(data);
  }

  static async findTeamById(req: Request, res: Response) {
    const { teamId } = req.params;
    const team = await teamService.findTeamById(Number(teamId));
    return res.status(200).json(team);
  }
}
