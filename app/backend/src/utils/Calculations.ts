export type Points = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
  goalsBalance: number;
  efficiency: number;
};

export type TypeMatch = {
  id: number,
  homeTeamGoals: number;
  awayTeamGoals: number;
  inProgress: boolean;
  homeTeam: {
    teamName: string;
  };
  awayTeam: {
    teamName: string;
  };
};

export default class Calculations {
  private _totalPoints = 0;
  private _totalGames = 0;
  private _totalVictories = 0;
  private _totalDraws = 0;
  private _totalLosses = 0;
  private _goalsFavor = 0;
  private _goalsOwn = 0;

  constructor(
    private teamName: string,
    private matches: TypeMatch[],
  ) {}

  totalGamesAndReturn(): Points {
    this.matches.filter((match) => match.homeTeam.teamName === this.teamName)
      .forEach((element) => {
        this._totalGames += 1;
        this.calculatePoints(element);
      });

    return {
      name: this.teamName,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
      goalsBalance: this._goalsFavor - this._goalsOwn,
      efficiency: Number(((this._totalPoints / (this._totalGames * 3)) * 100).toFixed(2)),
    };
  }

  private calculatePoints(match: TypeMatch) {
    this._goalsFavor += match.homeTeamGoals;
    this._goalsOwn += match.awayTeamGoals;

    if (match.homeTeamGoals === match.awayTeamGoals) {
      this._totalDraws += 1
      this._totalPoints += 1;
    } else if (match.homeTeamGoals > match.awayTeamGoals) {
      this._totalVictories += 1
      this._totalPoints += 3;
    } else {
      this._totalLosses += 1
      this._totalPoints += 0;
    }
  }
}