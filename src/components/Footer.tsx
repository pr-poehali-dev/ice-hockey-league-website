import { Link } from 'react-router-dom';
import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-card border-t border-border mt-20">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center">
                <span className="text-xl">🏒</span>
              </div>
              <div>
                <h3 className="text-xl font-bold">PHL</h3>
                <p className="text-xs text-muted-foreground">Первая Хоккейная Лига</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Официальный сайт Первой Хоккейной Лиги. Следите за расписанием, результатами и новостями.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Навигация</h4>
            <div className="flex flex-col gap-2">
              <Link to="/calendar" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Календарь игр
              </Link>
              <Link to="/standings" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Турнирная таблица
              </Link>
              <Link to="/teams" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Команды
              </Link>
              <Link to="/champions" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Чемпионы
              </Link>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <div className="flex flex-col gap-2">
              <Link to="/regulations" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                Регламент лиги
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center text-sm text-muted-foreground">
          <p>© 2024 PHL - Первая Хоккейная Лига. Все права защищены.</p>
        </div>
      </div>
    </footer>
  );
}