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

export interface Champion {
  year: number;
  team: Team;
  finals: string;
}

export const teams: Team[] = [
  { id: 1, name: 'Ледяные Волки', logo: '🐺', city: 'Москва', founded: 2020, arena: 'Арена Север' },
  { id: 2, name: 'Огненные Ястребы', logo: '🦅', city: 'Санкт-Петербург', founded: 2019, arena: 'Ледовый дворец' },
  { id: 3, name: 'Стальные Медведи', logo: '🐻', city: 'Казань', founded: 2021, arena: 'Кристалл' },
  { id: 4, name: 'Золотые Тигры', logo: '🐯', city: 'Новосибирск', founded: 2020, arena: 'Сибирь Арена' },
  { id: 5, name: 'Морские Акулы', logo: '🦈', city: 'Владивосток', founded: 2022, arena: 'Океан' },
  { id: 6, name: 'Снежные Барсы', logo: '🐆', city: 'Екатеринбург', founded: 2021, arena: 'Уральская арена' },
  { id: 7, name: 'Пламенные Драконы', logo: '🐲', city: 'Красноярск', founded: 2020, arena: 'Енисей' },
  { id: 8, name: 'Ночные Совы', logo: '🦉', city: 'Омск', founded: 2022, arena: 'Полет' },
];

export const matches: Match[] = [
  {
    id: 1,
    date: '2024-10-30',
    time: '19:00',
    homeTeam: teams[0],
    awayTeam: teams[1],
    homeScore: 4,
    awayScore: 3,
    status: 'finished',
    overtime: true,
  },
  {
    id: 2,
    date: '2024-10-30',
    time: '20:00',
    homeTeam: teams[2],
    awayTeam: teams[3],
    homeScore: 2,
    awayScore: 3,
    status: 'finished',
    shootout: true,
  },
  {
    id: 3,
    date: '2024-11-01',
    time: '18:30',
    homeTeam: teams[4],
    awayTeam: teams[5],
    status: 'upcoming',
  },
  {
    id: 4,
    date: '2024-11-01',
    time: '19:30',
    homeTeam: teams[6],
    awayTeam: teams[7],
    status: 'upcoming',
  },
  {
    id: 5,
    date: '2024-11-02',
    time: '17:00',
    homeTeam: teams[1],
    awayTeam: teams[4],
    status: 'upcoming',
  },
  {
    id: 6,
    date: '2024-11-02',
    time: '19:00',
    homeTeam: teams[3],
    awayTeam: teams[6],
    status: 'upcoming',
  },
];

export const calculateStandings = (): Standing[] => {
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

export const champions: Champion[] = [
  { year: 2023, team: teams[0], finals: 'Ледяные Волки 4 - 2 Огненные Ястребы' },
  { year: 2022, team: teams[1], finals: 'Огненные Ястребы 4 - 3 Стальные Медведи' },
  { year: 2021, team: teams[3], finals: 'Золотые Тигры 4 - 1 Снежные Барсы' },
];
