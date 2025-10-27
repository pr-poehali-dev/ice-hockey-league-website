import { Link } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';
import { matches, teams } from '@/data/mockData';

export default function Home() {
  const upcomingMatches = matches.filter(m => m.status === 'upcoming').slice(0, 3);
  const recentMatches = matches.filter(m => m.status === 'finished').slice(0, 3);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <section className="relative bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 py-32 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/placeholder.svg')] opacity-5 bg-cover bg-center"></div>
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-4xl mx-auto text-center animate-fade-in">
              <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                PHL
              </h1>
              <p className="text-3xl md:text-4xl font-semibold mb-4">
                Первая Хоккейная Лига
              </p>
              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                Следите за лучшими хоккейными матчами, результатами и рейтингами команд
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <Link to="/calendar">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-white">
                    <Icon name="Calendar" size={20} className="mr-2" />
                    Календарь игр
                  </Button>
                </Link>
                <Link to="/standings">
                  <Button size="lg" variant="outline" className="border-2">
                    <Icon name="Trophy" size={20} className="mr-2" />
                    Турнирная таблица
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-card/50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Ближайшие матчи</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {upcomingMatches.map((match, index) => (
                <Card key={match.id} className="animate-scale-in hover:scale-105 transition-transform" style={{animationDelay: `${index * 100}ms`}}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</p>
                      <p className="text-lg font-semibold text-primary">{match.time}</p>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-center">
                        <div className="text-4xl mb-2">{match.homeTeam.logo}</div>
                        <p className="font-semibold text-sm">{match.homeTeam.name}</p>
                      </div>
                      <div className="text-2xl font-bold text-muted-foreground">VS</div>
                      <div className="flex-1 text-center">
                        <div className="text-4xl mb-2">{match.awayTeam.logo}</div>
                        <p className="font-semibold text-sm">{match.awayTeam.name}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Последние результаты</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {recentMatches.map((match, index) => (
                <Card key={match.id} className="animate-scale-in" style={{animationDelay: `${index * 100}ms`}}>
                  <CardContent className="p-6">
                    <div className="text-center mb-4">
                      <p className="text-sm text-muted-foreground">{new Date(match.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}</p>
                      {match.overtime && <span className="text-xs bg-accent text-accent-foreground px-2 py-1 rounded-full ml-2">ОТ</span>}
                      {match.shootout && <span className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-full ml-2">Б</span>}
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex-1 text-center">
                        <div className="text-4xl mb-2">{match.homeTeam.logo}</div>
                        <p className="font-semibold text-sm mb-2">{match.homeTeam.name}</p>
                        <p className="text-2xl font-bold">{match.homeScore}</p>
                      </div>
                      <div className="text-xl font-bold">:</div>
                      <div className="flex-1 text-center">
                        <div className="text-4xl mb-2">{match.awayTeam.logo}</div>
                        <p className="font-semibold text-sm mb-2">{match.awayTeam.name}</p>
                        <p className="text-2xl font-bold">{match.awayScore}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-to-r from-primary/10 via-secondary/10 to-accent/10">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-12 text-center">Наши команды</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4 max-w-7xl mx-auto">
              {teams.map((team, index) => (
                <div 
                  key={team.id} 
                  className="flex flex-col items-center p-4 bg-card rounded-xl hover:scale-110 transition-transform animate-scale-in cursor-pointer"
                  style={{animationDelay: `${index * 50}ms`}}
                >
                  <div className="text-5xl mb-2">{team.logo}</div>
                  <p className="text-xs font-semibold text-center">{team.name}</p>
                </div>
              ))}
            </div>
            <div className="text-center mt-8">
              <Link to="/teams">
                <Button variant="outline" size="lg">
                  Все команды
                  <Icon name="ArrowRight" size={20} className="ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
