import MatchesService from './matches.services';
import TeamService from './teams.services';
import Calculations from '../utils/Calculations';
import TeamsSort from '../utils/TeamsSort';

export default class LeaderboardService {
  static async getHomeLeaderboard() {
    const allMatches = await MatchesService.getMatches('false');
    const dataAllMatches = allMatches.data.map((element) => {
      console.log(element.dataValues);
      const { inProgress, ...matches } = element.dataValues;
      return matches;
    });

    const allTeams = await TeamService.getAllTeams();

    const allTeamsMap = allTeams.data.map((team) => {
      const calculations = new Calculations(team.teamName, dataAllMatches);
      const totalPoints = calculations.totalGamesAndReturn();
      return totalPoints;
    });

    const sort = TeamsSort(allTeamsMap);
    return { status: 200, data: sort};
  }
}
