import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { fetchMatches } from '@/lib/api';
import Icon from '@/components/ui/icon';

export default function Calendar() {
  const { data: matches = [] } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchMatches,
  });

  const upcomingMatches = matches.filter(m => m.status === 'upcoming');
  const finishedMatches = matches.filter(m => m.status === 'finished');

  const MatchCard = ({ match, index }: { match: any; index: number }) => (
    <Card className="animate-fade-in hover:shadow-lg transition-all" style={{animationDelay: `${index * 50}ms`}}>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex-1 text-center md:text-right">
            <div className="flex items-center justify-center md:justify-end gap-3 mb-2">
              <span className="text-4xl">{match.homeTeam.logo}</span>
              <div>
                <p className="font-bold text-lg">{match.homeTeam.name}</p>
                <p className="text-sm text-muted-foreground">{match.homeTeam.city}</p>
              </div>
            </div>
            {match.status === 'finished' && (
              <p className="text-3xl font-bold text-primary">{match.homeScore}</p>
            )}
          </div>

          <div className="flex flex-col items-center gap-2 min-w-[120px]">
            <div className="flex items-center gap-2">
              <Icon name="Calendar" size={16} className="text-muted-foreground" />
              <p className="text-sm font-medium">
                {new Date(match.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}
              </p>
            </div>
            <p className="text-xl font-bold text-primary">{match.time}</p>
            {match.overtime && <span className="text-xs bg-accent text-accent-foreground px-3 py-1 rounded-full">Овертайм</span>}
            {match.shootout && <span className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full">Буллиты</span>}
          </div>

          <div className="flex-1 text-center md:text-left">
            <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
              <div>
                <p className="font-bold text-lg">{match.awayTeam.name}</p>
                <p className="text-sm text-muted-foreground">{match.awayTeam.city}</p>
              </div>
              <span className="text-4xl">{match.awayTeam.logo}</span>
            </div>
            {match.status === 'finished' && (
              <p className="text-3xl font-bold text-primary">{match.awayScore}</p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Календарь игр
              </h1>
              <p className="text-lg text-muted-foreground">
                Расписание матчей и результаты Первой Хоккейной Лиги
              </p>
            </div>

            <Tabs defaultValue="upcoming" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="upcoming" className="text-lg">
                  <Icon name="CalendarClock" size={20} className="mr-2" />
                  Предстоящие ({upcomingMatches.length})
                </TabsTrigger>
                <TabsTrigger value="finished" className="text-lg">
                  <Icon name="CheckCircle" size={20} className="mr-2" />
                  Завершённые ({finishedMatches.length})
                </TabsTrigger>
              </TabsList>

              <TabsContent value="upcoming" className="space-y-4">
                {upcomingMatches.length > 0 ? (
                  upcomingMatches.map((match, index) => (
                    <MatchCard key={match.id} match={match} index={index} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground">Нет предстоящих матчей</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>

              <TabsContent value="finished" className="space-y-4">
                {finishedMatches.length > 0 ? (
                  finishedMatches.map((match, index) => (
                    <MatchCard key={match.id} match={match} index={index} />
                  ))
                ) : (
                  <Card>
                    <CardContent className="p-12 text-center">
                      <Icon name="Calendar" size={48} className="mx-auto mb-4 text-muted-foreground" />
                      <p className="text-lg text-muted-foreground">Нет завершённых матчей</p>
                    </CardContent>
                  </Card>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}