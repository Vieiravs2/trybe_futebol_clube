import teamsModel from '../database/models/team.model';
import matchesModel from '../database/models/matches.model';

export default class MatchesService {
  static async getAllMatches() {
    const allMatches = await matchesModel.findAll({
      include: [
        { model: teamsModel, as: 'homeTeam' },
        { model: teamsModel, as: 'awayTeam' },
      ],
    });
    return allMatches;
  }
}
