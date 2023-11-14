import teamModel from '../database/models/team.model';

export default class TeamService {
  static async getAllTeams() {
    const findAll = await teamModel.findAll();
    return findAll;
  }
}
