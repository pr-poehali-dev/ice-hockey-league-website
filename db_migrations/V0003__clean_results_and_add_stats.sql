-- Очищаем все результаты матчей
UPDATE t_p44689110_ice_hockey_league_we.matches 
SET home_score = NULL, 
    away_score = NULL, 
    status = 'upcoming',
    overtime = false,
    shootout = false;

-- Создаем таблицу статистики команд
CREATE TABLE IF NOT EXISTS t_p44689110_ice_hockey_league_we.team_stats (
    id SERIAL PRIMARY KEY,
    team_id INTEGER NOT NULL REFERENCES t_p44689110_ice_hockey_league_we.teams(id),
    games_played INTEGER NOT NULL DEFAULT 0,
    wins INTEGER NOT NULL DEFAULT 0,
    wins_ot INTEGER NOT NULL DEFAULT 0,
    wins_so INTEGER NOT NULL DEFAULT 0,
    losses_ot INTEGER NOT NULL DEFAULT 0,
    losses_so INTEGER NOT NULL DEFAULT 0,
    losses INTEGER NOT NULL DEFAULT 0,
    goals_for INTEGER NOT NULL DEFAULT 0,
    goals_against INTEGER NOT NULL DEFAULT 0,
    points INTEGER NOT NULL DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(team_id)
);

-- Инициализируем статистику для всех команд
INSERT INTO t_p44689110_ice_hockey_league_we.team_stats (team_id, games_played, wins, wins_ot, wins_so, losses_ot, losses_so, losses, goals_for, goals_against, points)
SELECT id, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0
FROM t_p44689110_ice_hockey_league_we.teams
ON CONFLICT (team_id) DO NOTHING;

-- Создаем таблицу настроек лиги
CREATE TABLE IF NOT EXISTS t_p44689110_ice_hockey_league_we.league_settings (
    id SERIAL PRIMARY KEY,
    setting_key VARCHAR(100) NOT NULL UNIQUE,
    setting_value TEXT NOT NULL,
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Добавляем базовые настройки
INSERT INTO t_p44689110_ice_hockey_league_we.league_settings (setting_key, setting_value, description)
VALUES 
    ('period_duration', '5', 'Длительность периода в минутах'),
    ('periods_count', '3', 'Количество периодов'),
    ('overtime_duration', '5', 'Длительность овертайма в минутах'),
    ('overtime_format', '2+1', 'Формат овертайма (игроки)'),
    ('shootout_goals', '3', 'Количество голов в буллитах'),
    ('win_points', '2', 'Очки за победу'),
    ('ot_loss_points', '1', 'Очки за поражение в ОТ'),
    ('so_loss_points', '1', 'Очки за поражение в буллитах'),
    ('loss_points', '0', 'Очки за поражение'),
    ('playoff_name', 'Кубок России', 'Название плей-офф'),
    ('playoff_quarterfinal', 'BO3', 'Формат 1/4 финала'),
    ('playoff_semifinal', 'BO3', 'Формат 1/2 финала'),
    ('playoff_final', 'BO5', 'Формат финала')
ON CONFLICT (setting_key) DO NOTHING;