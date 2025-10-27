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
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Trophy" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">Структура лиги</h2>
                      <p className="text-muted-foreground mb-4">
                        Первая Хоккейная Лига состоит из 8 команд, разделённых на 3 дивизиона по географическому принципу.
                      </p>
                      
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-bold mb-3 text-primary flex items-center gap-2">
                            <Icon name="MapPin" size={18} />
                            Дивизион "Запад"
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li>• Лада (Тольятти)</li>
                            <li>• ЦСКА (Москва)</li>
                            <li>• СКА (Санкт-Петербург)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-bold mb-3 text-secondary flex items-center gap-2">
                            <Icon name="MapPin" size={18} />
                            Дивизион "Центр"
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li>• Сочи (Сочи)</li>
                            <li>• Ак Барс (Казань)</li>
                          </ul>
                        </div>
                        
                        <div className="bg-muted/50 p-4 rounded-lg">
                          <h3 className="font-bold mb-3 text-accent flex items-center gap-2">
                            <Icon name="MapPin" size={18} />
                            Дивизион "Восток"
                          </h3>
                          <ul className="space-y-2 text-sm">
                            <li>• Адмирал (Владивосток)</li>
                            <li>• Металлург (Магнитогорск)</li>
                            <li>• Амур (Хабаровск)</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '200ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Calendar" size={24} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Регулярный чемпионат</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Формат:</strong> Каждая команда проводит матчи со всеми соперниками в формате "каждый с каждым".
                        </p>
                        <p>
                          <strong className="text-foreground">Продолжительность матча:</strong> 3 периода по 20 минут игрового времени.
                        </p>
                        <p>
                          <strong className="text-foreground">Очки за матч:</strong>
                        </p>
                        <ul className="ml-6 space-y-1">
                          <li>• Победа в основное время - 3 очка</li>
                          <li>• Победа в овертайме или по буллитам - 3 очка</li>
                          <li>• Поражение в овертайме или по буллитам - 1 очко</li>
                          <li>• Поражение в основное время - 0 очков</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '300ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Zap" size={24} className="text-accent" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Овертайм и буллиты</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Овертайм:</strong> При равном счёте после основного времени назначается 5-минутный овертайм (формат 3 на 3). Команда, забившая первой, побеждает.
                        </p>
                        <p>
                          <strong className="text-foreground">Буллиты:</strong> Если в овертайме голов не забито, проводится серия буллитов (3 игрока от каждой команды). При необходимости серия продолжается до выявления победителя.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '400ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Award" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Плей-офф</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Участники:</strong> По итогам регулярного чемпионата 4 лучшие команды выходят в плей-офф.
                        </p>
                        <p>
                          <strong className="text-foreground">Формат:</strong> Все серии проводятся до 4 побед (best-of-7). В плей-офф нет буллитов - игра продолжается до первого заброшенного гола в овертайме.
                        </p>
                        <p>
                          <strong className="text-foreground">Сетка:</strong>
                        </p>
                        <ul className="ml-6 space-y-1">
                          <li>• Полуфинал: 1 место vs 4 место, 2 место vs 3 место</li>
                          <li>• Финал: победители полуфиналов</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '500ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Info" size={24} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-2xl font-bold mb-3">Дополнительная информация</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <p>
                          <strong className="text-foreground">Платформа:</strong> Все матчи проводятся в хоккейном симуляторе Puck.
                        </p>
                        <p>
                          <strong className="text-foreground">Трансляции:</strong> Матчи транслируются на Twitch канале лиги и в Discord сервере.
                        </p>
                        <p>
                          <strong className="text-foreground">Контакты:</strong> Для вопросов и предложений обращайтесь в раздел "Контакты".
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
