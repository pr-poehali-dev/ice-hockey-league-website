import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { teams } from '@/data/mockData';
import Icon from '@/components/ui/icon';

export default function Teams() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Команды лиги
              </h1>
              <p className="text-lg text-muted-foreground">
                Все участники Первой Хоккейной Лиги
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {teams.map((team, index) => (
                <Card 
                  key={team.id}
                  className="animate-scale-in hover:shadow-xl hover:-translate-y-2 transition-all cursor-pointer group overflow-hidden"
                  style={{animationDelay: `${index * 80}ms`}}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <CardContent className="p-6 relative z-10">
                    <div className="text-center">
                      <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 rounded-full flex items-center justify-center text-6xl group-hover:scale-110 transition-transform">
                        {team.logo}
                      </div>
                      
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {team.name}
                      </h3>
                      
                      <div className="space-y-2 text-sm text-muted-foreground">
                        <div className="flex items-center justify-center gap-2">
                          <Icon name="MapPin" size={16} />
                          <span>{team.city}</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2">
                          <Icon name="Calendar" size={16} />
                          <span>Основана: {team.founded}</span>
                        </div>
                        
                        <div className="flex items-center justify-center gap-2">
                          <Icon name="Home" size={16} />
                          <span>{team.arena}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 animate-fade-in" style={{animationDelay: '800ms'}}>
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <div className="text-5xl font-bold text-primary mb-2">{teams.length}</div>
                    <p className="text-muted-foreground">Команд в лиге</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-secondary mb-2">
                      {new Set(teams.map(t => t.city)).size}
                    </div>
                    <p className="text-muted-foreground">Городов</p>
                  </div>
                  <div>
                    <div className="text-5xl font-bold text-accent mb-2">
                      {Math.min(...teams.map(t => t.founded))}
                    </div>
                    <p className="text-muted-foreground">Год основания лиги</p>
                  </div>
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
