import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { fetchMatches, fetchTeams } from '@/lib/api';

const ADMIN_API_URL = 'https://functions.poehali.dev/7c98c8ca-eee5-42a7-b9f2-31e759e9aeef';
const ADMIN_KEY = 'phl_admin_2024';

export default function Admin() {
  const [adminKey, setAdminKey] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: matches = [] } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchMatches,
    enabled: isAuthenticated,
  });

  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
    enabled: isAuthenticated,
  });

  const [selectedMatch, setSelectedMatch] = useState<number | null>(null);
  const [homeScore, setHomeScore] = useState('');
  const [awayScore, setAwayScore] = useState('');
  const [overtime, setOvertime] = useState(false);
  const [shootout, setShootout] = useState(false);

  const [newMatchDate, setNewMatchDate] = useState('');
  const [newMatchTime, setNewMatchTime] = useState('');
  const [newMatchHome, setNewMatchHome] = useState('');
  const [newMatchAway, setNewMatchAway] = useState('');

  const updateMatchMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(ADMIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to update match');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast({ title: 'Успех', description: 'Результат матча обновлён' });
      setSelectedMatch(null);
      setHomeScore('');
      setAwayScore('');
      setOvertime(false);
      setShootout(false);
    },
    onError: () => {
      toast({ title: 'Ошибка', description: 'Не удалось обновить результат', variant: 'destructive' });
    },
  });

  const addMatchMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(ADMIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': adminKey,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('Failed to add match');
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      toast({ title: 'Успех', description: 'Матч добавлен' });
      setNewMatchDate('');
      setNewMatchTime('');
      setNewMatchHome('');
      setNewMatchAway('');
    },
    onError: () => {
      toast({ title: 'Ошибка', description: 'Не удалось добавить матч', variant: 'destructive' });
    },
  });

  const handleLogin = () => {
    if (adminKey === ADMIN_KEY) {
      setIsAuthenticated(true);
      toast({ title: 'Успех', description: 'Вход выполнен' });
    } else {
      toast({ title: 'Ошибка', description: 'Неверный ключ', variant: 'destructive' });
    }
  };

  const handleUpdateResult = () => {
    if (!selectedMatch || !homeScore || !awayScore) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    updateMatchMutation.mutate({
      action: 'update_match_result',
      match_id: selectedMatch,
      home_score: parseInt(homeScore),
      away_score: parseInt(awayScore),
      overtime,
      shootout,
    });
  };

  const handleAddMatch = () => {
    if (!newMatchDate || !newMatchTime || !newMatchHome || !newMatchAway) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }

    addMatchMutation.mutate({
      action: 'add_match',
      date: newMatchDate,
      time: newMatchTime,
      home_team_id: parseInt(newMatchHome),
      away_team_id: parseInt(newMatchAway),
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <Card className="w-full max-w-md animate-fade-in">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Icon name="Lock" size={24} />
                Админ-панель PHL
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adminKey">Ключ доступа</Label>
                  <Input
                    id="adminKey"
                    type="password"
                    value={adminKey}
                    onChange={(e) => setAdminKey(e.target.value)}
                    placeholder="Введите ключ"
                    onKeyPress={(e) => e.key === 'Enter' && handleLogin()}
                  />
                </div>
                <Button onClick={handleLogin} className="w-full">
                  <Icon name="LogIn" size={20} className="mr-2" />
                  Войти
                </Button>
              </div>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        <div className="container mx-auto px-4 py-12">
          <div className="max-w-6xl mx-auto">
            <div className="flex justify-between items-center mb-8 animate-fade-in">
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Админ-панель
                </h1>
                <p className="text-muted-foreground">Управление матчами и результатами</p>
              </div>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                <Icon name="LogOut" size={20} className="mr-2" />
                Выйти
              </Button>
            </div>

            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="results">
                  <Icon name="Edit" size={18} className="mr-2" />
                  Обновить результаты
                </TabsTrigger>
                <TabsTrigger value="add">
                  <Icon name="Plus" size={18} className="mr-2" />
                  Добавить матч
                </TabsTrigger>
              </TabsList>

              <TabsContent value="results">
                <Card>
                  <CardHeader>
                    <CardTitle>Обновить результат матча</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Выберите матч</Label>
                        <Select value={selectedMatch?.toString()} onValueChange={(v) => setSelectedMatch(parseInt(v))}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите матч" />
                          </SelectTrigger>
                          <SelectContent>
                            {matches.filter(m => m.status === 'upcoming').map((match) => (
                              <SelectItem key={match.id} value={match.id.toString()}>
                                {match.homeTeam.name} vs {match.awayTeam.name} - {new Date(match.date).toLocaleDateString('ru-RU')} {match.time}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Счёт хозяев</Label>
                          <Input
                            type="number"
                            min="0"
                            value={homeScore}
                            onChange={(e) => setHomeScore(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div>
                          <Label>Счёт гостей</Label>
                          <Input
                            type="number"
                            min="0"
                            value={awayScore}
                            onChange={(e) => setAwayScore(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                      </div>

                      <div className="flex gap-6">
                        <div className="flex items-center gap-2">
                          <Switch checked={overtime} onCheckedChange={setOvertime} disabled={shootout} />
                          <Label>Овертайм</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <Switch checked={shootout} onCheckedChange={setShootout} disabled={overtime} />
                          <Label>Буллиты</Label>
                        </div>
                      </div>

                      <Button onClick={handleUpdateResult} className="w-full" disabled={updateMatchMutation.isPending}>
                        <Icon name="Save" size={20} className="mr-2" />
                        {updateMatchMutation.isPending ? 'Сохранение...' : 'Сохранить результат'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="add">
                <Card>
                  <CardHeader>
                    <CardTitle>Добавить новый матч</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Дата</Label>
                          <Input
                            type="date"
                            value={newMatchDate}
                            onChange={(e) => setNewMatchDate(e.target.value)}
                          />
                        </div>
                        <div>
                          <Label>Время</Label>
                          <Input
                            type="time"
                            value={newMatchTime}
                            onChange={(e) => setNewMatchTime(e.target.value)}
                          />
                        </div>
                      </div>

                      <div>
                        <Label>Команда хозяев</Label>
                        <Select value={newMatchHome} onValueChange={setNewMatchHome}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите команду" />
                          </SelectTrigger>
                          <SelectContent>
                            {teams.map((team) => (
                              <SelectItem key={team.id} value={team.id.toString()}>
                                {team.logo} {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label>Команда гостей</Label>
                        <Select value={newMatchAway} onValueChange={setNewMatchAway}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите команду" />
                          </SelectTrigger>
                          <SelectContent>
                            {teams.filter(t => t.id.toString() !== newMatchHome).map((team) => (
                              <SelectItem key={team.id} value={team.id.toString()}>
                                {team.logo} {team.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={handleAddMatch} className="w-full" disabled={addMatchMutation.isPending}>
                        <Icon name="Plus" size={20} className="mr-2" />
                        {addMatchMutation.isPending ? 'Добавление...' : 'Добавить матч'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
