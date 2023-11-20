export type Points = {
  name: string;
  totalPoints: number;
  totalGames: number;
  totalVictories: number;
  totalDraws: number;
  totalLosses: number;
  goalsFavor: number;
  goalsOwn: number;
}

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
}

export default class Calculations {
  private _totalPoints: number = 0;
  private _totalGames: number = 0;
  private _totalVictories: number = 0;
  private _totalDraws: number = 0;
  private _totalLosses: number = 0;
  private _goalsFavor: number = 0;
  private _goalsOwn: number = 0;

  constructor(
    private teamName: string,
    private matches: TypeMatch[]
  ) {}

  totalGamesAndReturn(): Points {
    this.matches.filter((match) => match.homeTeam.teamName === this.teamName)
    .forEach((element) => { 
      this._totalGames += 1 
      this.calculatePoints(element)
    })

    return {
      name: this.teamName,
      totalPoints: this._totalPoints,
      totalGames: this._totalGames,
      totalVictories: this._totalVictories,
      totalDraws: this._totalDraws,
      totalLosses: this._totalLosses,
      goalsFavor: this._goalsFavor,
      goalsOwn: this._goalsOwn,
    }
  }

  private calculatePoints(match: TypeMatch) {
    const isHomeTeam = match.homeTeam.teamName === this.teamName;
    
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