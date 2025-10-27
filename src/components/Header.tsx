import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const navItems = [
  { path: '/', label: 'Главная' },
  { path: '/calendar', label: 'Календарь' },
  { path: '/standings', label: 'Таблица' },
  { path: '/champions', label: 'Чемпионы' },
  { path: '/teams', label: 'Команды' },
  { path: '/about', label: 'О лиге' },
  { path: '/regulations', label: 'Регламент' },
  { path: '/contacts', label: 'Контакты' },
];

export default function Header() {
  const location = useLocation();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [adminDialogOpen, setAdminDialogOpen] = useState(false);
  const [password, setPassword] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-12 h-12 bg-gradient-to-br from-primary via-secondary to-accent rounded-xl flex items-center justify-center animate-glow">
              <span className="text-2xl font-bold text-white">🏒</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                PHL
              </h1>
              <p className="text-xs text-muted-foreground">Первая Хоккейная Лига</p>
            </div>
          </Link>

          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                  location.pathname === item.path
                    ? 'bg-primary text-primary-foreground'
                    : 'text-foreground hover:bg-muted'
                }`}
              >
                {item.label}
              </Link>
            ))}
            
            <Dialog open={adminDialogOpen} onOpenChange={setAdminDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="icon" className="ml-2">
                  <Icon name="KeyRound" size={20} />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Вход в админ-панель</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="password">Пароль</Label>
                    <Input
                      id="password"
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Введите пароль"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter' && password === 'phldyeztop') {
                          navigate('/admin');
                          setAdminDialogOpen(false);
                          setPassword('');
                        }
                      }}
                    />
                  </div>
                  <Button
                    onClick={() => {
                      if (password === 'phldyeztop') {
                        navigate('/admin');
                        setAdminDialogOpen(false);
                        setPassword('');
                      }
                    }}
                    className="w-full"
                  >
                    Войти
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </nav>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Icon name="Menu" size={24} />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[280px]">
              <div className="flex flex-col gap-4 mt-8">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={`px-4 py-3 rounded-lg font-medium transition-all ${
                      location.pathname === item.path
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
                
                <Dialog>
                  <DialogTrigger asChild>
                    <Button variant="outline" className="w-full">
                      <Icon name="KeyRound" size={18} className="mr-2" />
                      Админ-панель
                    </Button>
                  </DialogTrigger>
                  <DialogContent>
                    <DialogHeader>
                      <DialogTitle>Вход в админ-панель</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="password-mobile">Пароль</Label>
                        <Input
                          id="password-mobile"
                          type="password"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                          placeholder="Введите пароль"
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && password === 'phldyeztop') {
                              navigate('/admin');
                              setOpen(false);
                              setPassword('');
                            }
                          }}
                        />
                      </div>
                      <Button
                        onClick={() => {
                          if (password === 'phldyeztop') {
                            navigate('/admin');
                            setOpen(false);
                            setPassword('');
                          }
                        }}
                        className="w-full"
                      >
                        Войти
                      </Button>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}