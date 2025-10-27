import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { fetchMatches, fetchTeams, calculateStandings } from '@/lib/api';
import Icon from '@/components/ui/icon';

export default function Standings() {
  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });

  const { data: matches = [] } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchMatches,
  });

  const standings = calculateStandings(teams, matches);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Турнирная таблица
              </h1>
              <p className="text-lg text-muted-foreground">
                Рейтинг команд с автоматическим подсчетом очков
              </p>
            </div>

            <Card className="animate-fade-in">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Trophy" size={24} className="text-primary" />
                  Сезон 2024
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead className="w-12 text-center">#</TableHead>
                        <TableHead>Команда</TableHead>
                        <TableHead className="text-center">И</TableHead>
                        <TableHead className="text-center">В</TableHead>
                        <TableHead className="text-center">П</TableHead>
                        <TableHead className="text-center">ПО</TableHead>
                        <TableHead className="text-center">ПБ</TableHead>
                        <TableHead className="text-center">Ш</TableHead>
                        <TableHead className="text-center">П</TableHead>
                        <TableHead className="text-center font-bold">О</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {standings.map((standing, index) => (
                        <TableRow 
                          key={standing.team.id}
                          className={`animate-fade-in hover:bg-muted/50 ${index < 4 ? 'border-l-4 border-l-primary' : ''}`}
                          style={{animationDelay: `${index * 50}ms`}}
                        >
                          <TableCell className="text-center font-bold">
                            {index + 1}
                            {index === 0 && <span className="ml-2">🥇</span>}
                            {index === 1 && <span className="ml-2">🥈</span>}
                            {index === 2 && <span className="ml-2">🥉</span>}
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <span className="text-3xl">{standing.team.logo}</span>
                              <div>
                                <p className="font-semibold">{standing.team.name}</p>
                                <p className="text-xs text-muted-foreground">{standing.team.city}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="text-center">{standing.games}</TableCell>
                          <TableCell className="text-center text-green-500 font-semibold">{standing.wins}</TableCell>
                          <TableCell className="text-center text-red-500">{standing.losses}</TableCell>
                          <TableCell className="text-center text-orange-500">{standing.overtimeLosses}</TableCell>
                          <TableCell className="text-center text-yellow-500">{standing.shootoutLosses}</TableCell>
                          <TableCell className="text-center text-sm">
                            {standing.goalsFor}:{standing.goalsAgainst}
                          </TableCell>
                          <TableCell className="text-center text-muted-foreground">
                            {standing.goalsFor - standing.goalsAgainst > 0 ? '+' : ''}{standing.goalsFor - standing.goalsAgainst}
                          </TableCell>
                          <TableCell className="text-center">
                            <span className="font-bold text-lg text-primary">{standing.points}</span>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>

                <div className="mt-8 p-4 bg-muted/50 rounded-lg">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Info" size={18} />
                    Система начисления очков
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-500/20 text-green-500 rounded flex items-center justify-center font-bold">3</span>
                      <span>Победа в основное время</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-orange-500/20 text-orange-500 rounded flex items-center justify-center font-bold">1</span>
                      <span>Поражение в овертайме</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-500/20 text-green-500 rounded flex items-center justify-center font-bold">3</span>
                      <span>Победа в овертайме</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-yellow-500/20 text-yellow-500 rounded flex items-center justify-center font-bold">1</span>
                      <span>Поражение по буллитам</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-green-500/20 text-green-500 rounded flex items-center justify-center font-bold">3</span>
                      <span>Победа по буллитам</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="w-8 h-8 bg-red-500/20 text-red-500 rounded flex items-center justify-center font-bold">0</span>
                      <span>Поражение в основное время</span>
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground mt-4">
                    <strong>Обозначения:</strong> И - игры, В - победы, П - поражения, ПО - поражения в овертайме, ПБ - поражения по буллитам, Ш - забитые:пропущенные, П - разница шайб, О - очки
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}