import teamModel from '../database/models/team.model';

export default class TeamService {
  static async getAllTeams() {
    const findAll = await teamModel.findAll();
    return findAll;
  }

  static async findTeamById(id: number) {
    const team = await teamModel.findByPk(id);
    return team || false;
  }
}
