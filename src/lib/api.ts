const API_URL = 'https://functions.poehali.dev/489905c6-13a2-4cb4-a3c1-ce11a8ebb8d1';

export interface Team {
  id: number;
  name: string;
  logo: string;
  city: string;
  founded: number;
  arena: string;
}

export interface Match {
  id: number;
  date: string;
  time: string;
  homeTeam: Team;
  awayTeam: Team;
  homeScore?: number;
  awayScore?: number;
  status: 'upcoming' | 'live' | 'finished';
  overtime?: boolean;
  shootout?: boolean;
}

export interface Champion {
  year: number;
  team: Team;
  finals: string;
}

export interface Standing {
  team: Team;
  games: number;
  wins: number;
  losses: number;
  overtimeLosses: number;
  shootoutLosses: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
}

export const fetchTeams = async (): Promise<Team[]> => {
  const response = await fetch(`${API_URL}?endpoint=teams`);
  const data = await response.json();
  return data.teams;
};

export const fetchMatches = async (): Promise<Match[]> => {
  const response = await fetch(`${API_URL}?endpoint=matches`);
  const data = await response.json();
  return data.matches;
};

export const fetchChampions = async (): Promise<Champion[]> => {
  const response = await fetch(`${API_URL}?endpoint=champions`);
  const data = await response.json();
  return data.champions;
};

export const calculateStandings = (teams: Team[], matches: Match[]): Standing[] => {
  const standingsMap = new Map<number, Standing>();

  teams.forEach(team => {
    standingsMap.set(team.id, {
      team,
      games: 0,
      wins: 0,
      losses: 0,
      overtimeLosses: 0,
      shootoutLosses: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      points: 0,
    });
  });

  matches
    .filter(match => match.status === 'finished' && match.homeScore !== undefined && match.awayScore !== undefined)
    .forEach(match => {
      const homeStanding = standingsMap.get(match.homeTeam.id)!;
      const awayStanding = standingsMap.get(match.awayTeam.id)!;

      homeStanding.games += 1;
      awayStanding.games += 1;

      homeStanding.goalsFor += match.homeScore!;
      homeStanding.goalsAgainst += match.awayScore!;
      awayStanding.goalsFor += match.awayScore!;
      awayStanding.goalsAgainst += match.homeScore!;

      if (match.homeScore! > match.awayScore!) {
        homeStanding.wins += 1;
        homeStanding.points += 3;

        if (match.overtime) {
          awayStanding.overtimeLosses += 1;
          awayStanding.points += 1;
        } else if (match.shootout) {
          awayStanding.shootoutLosses += 1;
          awayStanding.points += 1;
        } else {
          awayStanding.losses += 1;
        }
      } else {
        awayStanding.wins += 1;
        awayStanding.points += 3;

        if (match.overtime) {
          homeStanding.overtimeLosses += 1;
          homeStanding.points += 1;
        } else if (match.shootout) {
          homeStanding.shootoutLosses += 1;
          homeStanding.points += 1;
        } else {
          homeStanding.losses += 1;
        }
      }
    });

  return Array.from(standingsMap.values()).sort((a, b) => {
    if (b.points !== a.points) return b.points - a.points;
    const aDiff = a.goalsFor - a.goalsAgainst;
    const bDiff = b.goalsFor - b.goalsAgainst;
    if (bDiff !== aDiff) return bDiff - aDiff;
    return b.goalsFor - a.goalsFor;
  });
};
