import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import Icon from '@/components/ui/icon';

export default function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                О лиге
              </h1>
              <p className="text-lg text-muted-foreground">
                История и миссия Первой Хоккейной Лиги
              </p>
            </div>

            <div className="space-y-6">
              <Card className="animate-fade-in" style={{animationDelay: '100ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Target" size={24} className="text-primary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">Наша миссия</h2>
                      <p className="text-muted-foreground leading-relaxed">
                        Первая Хоккейная Лига (PHL) создана для развития хоккея и предоставления 
                        возможности талантливым командам проявить себя на профессиональном уровне. 
                        Мы стремимся популяризировать хоккей, создавая захватывающие спортивные события 
                        и объединяя болельщиков по всей стране.
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '200ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="History" size={24} className="text-secondary" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">История лиги</h2>
                      <p className="text-muted-foreground leading-relaxed mb-4">
                        PHL была основана в 2019 году с целью создания современной, динамично развивающейся 
                        хоккейной лиги. За годы своего существования лига прошла путь от турнира с 4 командами 
                        до полноценного чемпионата с 8 профессиональными клубами.
                      </p>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                        <div className="bg-muted/50 p-4 rounded-lg text-center">
                          <p className="text-3xl font-bold text-primary mb-1">2019</p>
                          <p className="text-sm text-muted-foreground">Основание лиги</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg text-center">
                          <p className="text-3xl font-bold text-secondary mb-1">2021</p>
                          <p className="text-sm text-muted-foreground">Расширение до 8 команд</p>
                        </div>
                        <div className="bg-muted/50 p-4 rounded-lg text-center">
                          <p className="text-3xl font-bold text-accent mb-1">2024</p>
                          <p className="text-sm text-muted-foreground">Текущий сезон</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '300ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-accent/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Trophy" size={24} className="text-accent" />
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold mb-3">Формат турнира</h2>
                      <div className="space-y-3 text-muted-foreground">
                        <div className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <p>
                            <strong>Регулярный чемпионат:</strong> Каждая команда проводит матчи со всеми соперниками. 
                            За победу в основное время начисляется 3 очка, за победу в овертайме или по буллитам - 3 очка, 
                            за поражение в овертайме или по буллитам - 1 очко.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <p>
                            <strong>Плей-офф:</strong> По итогам регулярного чемпионата 4 лучшие команды выходят в плей-офф, 
                            где разыгрывают главный трофей лиги.
                          </p>
                        </div>
                        <div className="flex items-start gap-3">
                          <Icon name="CheckCircle" size={20} className="text-primary mt-0.5 flex-shrink-0" />
                          <p>
                            <strong>Овертайм и буллиты:</strong> Если в основное время счет равный, назначается 5-минутный 
                            овертайм. Если победитель не выявлен, проводится серия буллитов.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" style={{animationDelay: '400ms'}}>
                <CardContent className="p-8 text-center">
                  <Icon name="Users" size={48} className="mx-auto mb-4 text-primary" />
                  <h2 className="text-2xl font-bold mb-3">Присоединяйтесь к нам!</h2>
                  <p className="text-muted-foreground max-w-2xl mx-auto">
                    Следите за матчами в прямом эфире, болейте за любимые команды и становитесь частью 
                    растущего сообщества любителей хоккея!
                  </p>
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
