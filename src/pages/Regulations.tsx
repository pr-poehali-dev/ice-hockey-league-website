import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function Regulations() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Регламент лиги
              </h1>
              <p className="text-lg text-muted-foreground">
                Правила и структура турнира PHL в игре Puck
              </p>
            </div>

            <div className="space-y-6">
              <Card className="animate-fade-in" style={{animationDelay: '100ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Calendar" size={24} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Регулярный чемпионат</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Формат:</strong> Каждая команда проводит матчи со всеми соперниками.
                        </p>
                        <p>
                          <strong className="text-foreground">Продолжительность матча:</strong> 3 периода по 5 минут.
                        </p>
                        <p>
                          <strong className="text-foreground">Очки за матч:</strong>
                        </p>
                        <ul className="ml-6 space-y-1">
                          <li>• Победа в основное время - 2 очка</li>
                          <li>• Победа в овертайме или по буллитам - 2 очка</li>
                          <li>• Поражение в овертайме или по буллитам - 1 очко</li>
                          <li>• Поражение в основное время - 0 очков</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '200ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Zap" size={24} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Овертайм и буллиты</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Овертайм:</strong> При равном счёте после основного времени назначается 5-минутный овертайм в формате 3 на 1 (сам матч проходит 2+1).
                        </p>
                        <p>
                          <strong className="text-foreground">Буллиты:</strong> Если в овертайме голов не забито, проводится серия буллитов до 3-х голов.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '300ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Кубок России (Плей-офф)</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Участники:</strong> Любые команды из всех трёх дивизионов могут участвовать в Кубке России.
                        </p>
                        <p>
                          <strong className="text-foreground">Формат:</strong>
                        </p>
                        <ul className="ml-6 space-y-1">
                          <li>• Четвертьфинал и полуфинал: Best of 3 (до 2 побед)</li>
                          <li>• Финал: Best of 5 (до 3 побед)</li>
                        </ul>
                        <p className="mt-3">
                          <strong className="text-foreground">Овертайм в плей-офф:</strong> В плей-офф нет буллитов - игра продолжается до первого заброшенного гола в овертайме.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
