import teamsModel from '../database/models/team.model';
import matchesModel from '../database/models/matches.model';

export default class MatchesService {
  static async getAllMatches() {
    const allMatches = await matchesModel.findAll({
      include: [
        { model: teamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: teamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });
    return { status: 200, data: allMatches };
  }
}
