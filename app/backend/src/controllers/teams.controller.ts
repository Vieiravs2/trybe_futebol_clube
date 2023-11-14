import { Request, Response } from 'express';
import teamService from '../services/teams.services';

export default class TeamController {
  static async getAllTeams(req: Request, res: Response) {
    const teams = await teamService.getAllTeams();
    res.status(200).json(teams);
  }

  static async findTeamById(req: Request, res: Response) {
    const { teamId } = req.params;
    const team = await teamService.findTeamById(Number(teamId));
    res.status(200).json(team);
  }
}
