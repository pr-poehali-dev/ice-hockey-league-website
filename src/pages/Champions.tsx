import { useQuery } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { fetchChampions } from '@/lib/api';
import Icon from '@/components/ui/icon';

export default function Champions() {
  const { data: champions = [] } = useQuery({
    queryKey: ['champions'],
    queryFn: fetchChampions,
  });
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <div className="flex justify-center mb-4">
                <Icon name="Trophy" size={64} className="text-primary animate-glow" />
              </div>
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Чемпионы лиги
              </h1>
              <p className="text-lg text-muted-foreground">
                Команды, завоевавшие главный трофей PHL
              </p>
            </div>

            <div className="space-y-6">
              {champions.map((champion, index) => (
                <Card 
                  key={champion.year}
                  className="animate-fade-in hover:shadow-2xl transition-all overflow-hidden"
                  style={{animationDelay: `${index * 150}ms`}}
                >
                  <CardContent className="p-0">
                    <div className="relative bg-gradient-to-br from-primary/20 via-secondary/20 to-accent/20 p-8">
                      <div className="absolute top-4 right-4 text-8xl font-bold text-white/5">
                        {champion.year}
                      </div>
                      
                      <div className="relative z-10 flex flex-col md:flex-row items-center gap-8">
                        <div className="flex-shrink-0">
                          <div className="w-32 h-32 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center text-7xl animate-glow shadow-2xl">
                            {champion.team.logo}
                          </div>
                        </div>

                        <div className="flex-1 text-center md:text-left">
                          <div className="flex items-center justify-center md:justify-start gap-3 mb-2">
                            <Icon name="Trophy" size={28} className="text-primary" />
                            <h2 className="text-4xl font-bold">{champion.year}</h2>
                          </div>
                          <h3 className="text-3xl font-bold mb-3 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                            {champion.team.name}
                          </h3>
                          <p className="text-lg text-muted-foreground mb-2">
                            <Icon name="MapPin" size={18} className="inline mr-2" />
                            {champion.team.city}
                          </p>
                          <div className="inline-block bg-card px-4 py-2 rounded-lg border border-border">
                            <p className="text-sm font-semibold">Финал:</p>
                            <p className="text-base">{champion.finals}</p>
                          </div>
                        </div>

                        <div className="flex-shrink-0">
                          <div className="text-6xl opacity-20">🏆</div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card className="mt-12 animate-fade-in" style={{animationDelay: '500ms'}}>
              <CardContent className="p-8 text-center">
                <Icon name="Star" size={48} className="mx-auto mb-4 text-primary" />
                <h3 className="text-2xl font-bold mb-3">Путь к чемпионству</h3>
                <p className="text-muted-foreground max-w-2xl mx-auto">
                  Каждая команда прошла через напряженный регулярный сезон и плей-офф, 
                  проявив лучшие качества настоящих чемпионов: мастерство, командный дух и волю к победе.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}