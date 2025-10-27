import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import Icon from '@/components/ui/icon';
import { fetchMatches, fetchTeams, fetchChampions } from '@/lib/api';

const ADMIN_API_URL = 'https://functions.poehali.dev/7c98c8ca-eee5-42a7-b9f2-31e759e9aeef';
const ADMIN_KEY = 'phldyeztop';

export default function Admin() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: matches = [] } = useQuery({
    queryKey: ['matches'],
    queryFn: fetchMatches,
  });

  const { data: teams = [] } = useQuery({
    queryKey: ['teams'],
    queryFn: fetchTeams,
  });

  const { data: champions = [] } = useQuery({
    queryKey: ['champions'],
    queryFn: fetchChampions,
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

  const [selectedTeam, setSelectedTeam] = useState<number | null>(null);
  const [teamName, setTeamName] = useState('');
  const [teamLogo, setTeamLogo] = useState('');
  const [teamCity, setTeamCity] = useState('');
  const [teamArena, setTeamArena] = useState('');
  const [teamDivision, setTeamDivision] = useState('');

  const [championYear, setChampionYear] = useState('');
  const [championTeam, setChampionTeam] = useState('');
  const [championFinals, setChampionFinals] = useState('');

  const apiMutation = useMutation({
    mutationFn: async (data: any) => {
      const response = await fetch(ADMIN_API_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Admin-Key': ADMIN_KEY,
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error('API request failed');
      return response.json();
    },
    onSuccess: (data, variables) => {
      queryClient.invalidateQueries({ queryKey: ['matches'] });
      queryClient.invalidateQueries({ queryKey: ['teams'] });
      queryClient.invalidateQueries({ queryKey: ['champions'] });
      
      const messages: Record<string, string> = {
        'update_match_result': 'Результат обновлён',
        'add_match': 'Матч добавлен',
        'update_team': 'Команда обновлена',
        'add_champion': 'Чемпион добавлен',
      };
      
      toast({ title: 'Успех', description: messages[variables.action] || 'Операция выполнена' });
      
      setSelectedMatch(null);
      setHomeScore('');
      setAwayScore('');
      setOvertime(false);
      setShootout(false);
      setNewMatchDate('');
      setNewMatchTime('');
      setNewMatchHome('');
      setNewMatchAway('');
      setSelectedTeam(null);
      setTeamName('');
      setTeamLogo('');
      setTeamCity('');
      setTeamArena('');
      setTeamDivision('');
      setChampionYear('');
      setChampionTeam('');
      setChampionFinals('');
    },
    onError: () => {
      toast({ title: 'Ошибка', description: 'Не удалось выполнить операцию', variant: 'destructive' });
    },
  });

  const handleUpdateResult = () => {
    if (!selectedMatch || !homeScore || !awayScore) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }
    apiMutation.mutate({
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
    apiMutation.mutate({
      action: 'add_match',
      date: newMatchDate,
      time: newMatchTime,
      home_team_id: parseInt(newMatchHome),
      away_team_id: parseInt(newMatchAway),
    });
  };

  const handleUpdateTeam = () => {
    if (!selectedTeam) {
      toast({ title: 'Ошибка', description: 'Выберите команду', variant: 'destructive' });
      return;
    }
    
    const updateData: any = { action: 'update_team', team_id: selectedTeam };
    if (teamName) updateData.name = teamName;
    if (teamLogo) updateData.logo = teamLogo;
    if (teamCity) updateData.city = teamCity;
    if (teamArena) updateData.arena = teamArena;
    if (teamDivision) updateData.division = teamDivision;
    
    apiMutation.mutate(updateData);
  };

  const handleAddChampion = () => {
    if (!championYear || !championTeam || !championFinals) {
      toast({ title: 'Ошибка', description: 'Заполните все поля', variant: 'destructive' });
      return;
    }
    apiMutation.mutate({
      action: 'add_champion',
      year: parseInt(championYear),
      team_id: parseInt(championTeam),
      finals: championFinals,
    });
  };

  const loadTeamData = (teamId: number) => {
    const team = teams.find(t => t.id === teamId);
    if (team) {
      setTeamName(team.name);
      setTeamLogo(team.logo);
      setTeamCity(team.city);
      setTeamArena(team.arena);
      setTeamDivision((team as any).division || '');
    }
  };

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
                <p className="text-muted-foreground">Управление PHL</p>
              </div>
              <Button variant="outline" onClick={() => navigate('/')}>
                <Icon name="Home" size={20} className="mr-2" />
                На главную
              </Button>
            </div>

            <Tabs defaultValue="results" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="results">Результаты</TabsTrigger>
                <TabsTrigger value="add">Добавить матч</TabsTrigger>
                <TabsTrigger value="teams">Команды</TabsTrigger>
                <TabsTrigger value="champions">Чемпионы</TabsTrigger>
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
                          <Input type="number" min="0" value={homeScore} onChange={(e) => setHomeScore(e.target.value)} placeholder="0" />
                        </div>
                        <div>
                          <Label>Счёт гостей</Label>
                          <Input type="number" min="0" value={awayScore} onChange={(e) => setAwayScore(e.target.value)} placeholder="0" />
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

                      <Button onClick={handleUpdateResult} className="w-full" disabled={apiMutation.isPending}>
                        <Icon name="Save" size={20} className="mr-2" />
                        {apiMutation.isPending ? 'Сохранение...' : 'Сохранить результат'}
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
                          <Input type="date" value={newMatchDate} onChange={(e) => setNewMatchDate(e.target.value)} />
                        </div>
                        <div>
                          <Label>Время</Label>
                          <Input type="time" value={newMatchTime} onChange={(e) => setNewMatchTime(e.target.value)} />
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

                      <Button onClick={handleAddMatch} className="w-full" disabled={apiMutation.isPending}>
                        <Icon name="Plus" size={20} className="mr-2" />
                        {apiMutation.isPending ? 'Добавление...' : 'Добавить матч'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="teams">
                <Card>
                  <CardHeader>
                    <CardTitle>Редактировать команду</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Выберите команду</Label>
                        <Select 
                          value={selectedTeam?.toString()} 
                          onValueChange={(v) => {
                            const id = parseInt(v);
                            setSelectedTeam(id);
                            loadTeamData(id);
                          }}
                        >
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

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Название</Label>
                          <Input value={teamName} onChange={(e) => setTeamName(e.target.value)} placeholder="Название команды" />
                        </div>
                        <div>
                          <Label>Лого (эмодзи)</Label>
                          <Input value={teamLogo} onChange={(e) => setTeamLogo(e.target.value)} placeholder="🏒" />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>Город</Label>
                          <Input value={teamCity} onChange={(e) => setTeamCity(e.target.value)} placeholder="Город" />
                        </div>
                        <div>
                          <Label>Арена</Label>
                          <Input value={teamArena} onChange={(e) => setTeamArena(e.target.value)} placeholder="Название арены" />
                        </div>
                      </div>

                      <div>
                        <Label>Дивизион</Label>
                        <Select value={teamDivision} onValueChange={setTeamDivision}>
                          <SelectTrigger>
                            <SelectValue placeholder="Выберите дивизион" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Запад">Запад</SelectItem>
                            <SelectItem value="Центр">Центр</SelectItem>
                            <SelectItem value="Восток">Восток</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <Button onClick={handleUpdateTeam} className="w-full" disabled={apiMutation.isPending}>
                        <Icon name="Save" size={20} className="mr-2" />
                        {apiMutation.isPending ? 'Сохранение...' : 'Сохранить изменения'}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="champions">
                <Card>
                  <CardHeader>
                    <CardTitle>Добавить/Обновить чемпиона</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div>
                        <Label>Год</Label>
                        <Input type="number" value={championYear} onChange={(e) => setChampionYear(e.target.value)} placeholder="2024" />
                      </div>

                      <div>
                        <Label>Команда-чемпион</Label>
                        <Select value={championTeam} onValueChange={setChampionTeam}>
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
                        <Label>Описание финала</Label>
                        <Input 
                          value={championFinals} 
                          onChange={(e) => setChampionFinals(e.target.value)} 
                          placeholder="Команда А 4 - 2 Команда Б" 
                        />
                      </div>

                      <Button onClick={handleAddChampion} className="w-full" disabled={apiMutation.isPending}>
                        <Icon name="Trophy" size={20} className="mr-2" />
                        {apiMutation.isPending ? 'Сохранение...' : 'Сохранить чемпиона'}
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
