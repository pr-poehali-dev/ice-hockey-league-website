import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

export default function Contacts() {
  const socialLinks = [
    {
      name: 'Twitch',
      icon: 'Twitch',
      url: 'https://twitch.tv/phl_league',
      description: 'Смотрите матчи в прямом эфире',
      color: 'from-purple-500 to-purple-600',
    },
    {
      name: 'Discord',
      icon: 'MessageCircle',
      url: 'https://discord.gg/phl',
      description: 'Общайтесь с болельщиками',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      name: 'Telegram',
      icon: 'Send',
      url: 'https://t.me/phl_official',
      description: 'Новости и результаты',
      color: 'from-blue-500 to-blue-600',
    },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-5xl mx-auto">
            <div className="text-center mb-12 animate-fade-in">
              <h1 className="text-5xl font-bold mb-4 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                Контакты
              </h1>
              <p className="text-lg text-muted-foreground">
                Свяжитесь с нами и следите за новостями лиги
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {socialLinks.map((social, index) => (
                <Card 
                  key={social.name}
                  className="animate-scale-in hover:shadow-xl hover:-translate-y-2 transition-all group cursor-pointer overflow-hidden"
                  style={{animationDelay: `${index * 100}ms`}}
                >
                  <a href={social.url} target="_blank" rel="noopener noreferrer" className="block">
                    <CardContent className="p-8 text-center">
                      <div className={`w-20 h-20 mx-auto mb-4 bg-gradient-to-br ${social.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg`}>
                        <Icon name={social.icon as any} size={32} className="text-white" />
                      </div>
                      <h3 className="text-2xl font-bold mb-2">{social.name}</h3>
                      <p className="text-muted-foreground text-sm mb-4">{social.description}</p>
                      <Button variant="outline" className="w-full group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                        Перейти
                        <Icon name="ArrowRight" size={16} className="ml-2" />
                      </Button>
                    </CardContent>
                  </a>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="animate-fade-in" style={{animationDelay: '300ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Mail" size={24} className="text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Email</h3>
                      <p className="text-muted-foreground mb-3">
                        Для официальных запросов и предложений
                      </p>
                      <a href="mailto:info@phl-league.ru" className="text-primary hover:underline font-medium">
                        info@phl-league.ru
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="animate-fade-in" style={{animationDelay: '400ms'}}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-12 h-12 bg-secondary/20 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Icon name="Phone" size={24} className="text-secondary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">Телефон</h3>
                      <p className="text-muted-foreground mb-3">
                        Горячая линия для болельщиков
                      </p>
                      <a href="tel:+74951234567" className="text-primary hover:underline font-medium">
                        +7 (495) 123-45-67
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card className="mt-8 animate-fade-in bg-gradient-to-br from-primary/10 via-secondary/10 to-accent/10" style={{animationDelay: '500ms'}}>
              <CardContent className="p-8">
                <div className="text-center mb-6">
                  <Icon name="MapPin" size={48} className="mx-auto mb-4 text-primary" />
                  <h3 className="text-2xl font-bold mb-2">Офис лиги</h3>
                  <p className="text-muted-foreground">
                    г. Москва, ул. Спортивная, д. 10, офис 301
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Пн-Пт: 10:00 - 18:00
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="mt-8 animate-fade-in" style={{animationDelay: '600ms'}}>
              <CardContent className="p-8 text-center">
                <Icon name="Newspaper" size={48} className="mx-auto mb-4 text-accent" />
                <h3 className="text-2xl font-bold mb-3">Для СМИ</h3>
                <p className="text-muted-foreground mb-4">
                  Аккредитация журналистов, пресс-релизы и медиаматериалы
                </p>
                <a href="mailto:press@phl-league.ru">
                  <Button variant="outline" size="lg">
                    <Icon name="Mail" size={20} className="mr-2" />
                    press@phl-league.ru
                  </Button>
                </a>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
