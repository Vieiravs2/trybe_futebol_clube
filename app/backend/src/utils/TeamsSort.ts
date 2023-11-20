import { Points } from './Calculations'

const TeamsSort = (arr: Points[]) => (
  arr.sort((a, b) => {
    if (a.totalPoints !== b.totalPoints) {
      return b.totalPoints - a.totalPoints; 
    }

    if (a.totalVictories !== b.totalVictories) {
      return b.totalVictories - a.totalVictories; 
    }

    return b.goalsFavor - a.goalsFavor;
  }) 
);

export default TeamsSort;