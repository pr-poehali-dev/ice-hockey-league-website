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

export const fetchStandings = async (): Promise<Standing[]> => {
  const response = await fetch(`${API_URL}?endpoint=standings`);
  const data = await response.json();
  return data.standings;
};