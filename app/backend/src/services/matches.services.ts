import teamsModel from '../database/models/team.model';
import matchesModel from '../database/models/matches.model';

export default class MatchesService {
  static async getMatches(inProgress: string | undefined) {
    const allMatches = await matchesModel.findAll({
      include: [
        { model: teamsModel, as: 'homeTeam', attributes: { exclude: ['id'] } },
        { model: teamsModel, as: 'awayTeam', attributes: { exclude: ['id'] } },
      ],
    });

    if (inProgress) {
      if (inProgress === 'true') {
        const inProgressMatches = allMatches.filter((match) => match.inProgress);
        return { status: 200, data: inProgressMatches };
      }

      if (inProgress === 'false') {
        const finishedMatches = allMatches.filter((match) => !match.inProgress);
        return { status: 200, data: finishedMatches };
      }
    }

    return { status: 200, data: allMatches };
  }

  static async finishMatch(matchId: string) {
    const debug = await matchesModel.findAll(
      { where: { id: Number(matchId) } },
    );
    console.log(debug);
    await matchesModel.update({ inProgress: false }, { where: { id: Number(matchId) } });
  }

  static async updatedMatch(matchId: string, homeTeamGoals: string, awayTeamGoals: string) {
    await matchesModel.update(
      { homeTeamGoals: Number(homeTeamGoals), awayTeamGoals: Number(awayTeamGoals) },
      { where: { id: Number(matchId) } },
    );
  }
}
