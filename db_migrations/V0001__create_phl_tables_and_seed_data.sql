CREATE TABLE IF NOT EXISTS teams (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    logo VARCHAR(10) NOT NULL,
    city VARCHAR(255) NOT NULL,
    founded INTEGER NOT NULL,
    arena VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS matches (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    time VARCHAR(10) NOT NULL,
    home_team_id INTEGER NOT NULL REFERENCES teams(id),
    away_team_id INTEGER NOT NULL REFERENCES teams(id),
    home_score INTEGER,
    away_score INTEGER,
    status VARCHAR(20) NOT NULL DEFAULT 'upcoming',
    overtime BOOLEAN DEFAULT FALSE,
    shootout BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS champions (
    id SERIAL PRIMARY KEY,
    year INTEGER NOT NULL UNIQUE,
    team_id INTEGER NOT NULL REFERENCES teams(id),
    finals VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO teams (name, logo, city, founded, arena) VALUES
('Ледяные Волки', '🐺', 'Москва', 2020, 'Арена Север'),
('Огненные Ястребы', '🦅', 'Санкт-Петербург', 2019, 'Ледовый дворец'),
('Стальные Медведи', '🐻', 'Казань', 2021, 'Кристалл'),
('Золотые Тигры', '🐯', 'Новосибирск', 2020, 'Сибирь Арена'),
('Морские Акулы', '🦈', 'Владивосток', 2022, 'Океан'),
('Снежные Барсы', '🐆', 'Екатеринбург', 2021, 'Уральская арена'),
('Пламенные Драконы', '🐲', 'Красноярск', 2020, 'Енисей'),
('Ночные Совы', '🦉', 'Омск', 2022, 'Полет');

INSERT INTO matches (date, time, home_team_id, away_team_id, home_score, away_score, status, overtime, shootout) VALUES
('2024-10-30', '19:00', 1, 2, 4, 3, 'finished', TRUE, FALSE),
('2024-10-30', '20:00', 3, 4, 2, 3, 'finished', FALSE, TRUE),
('2024-11-01', '18:30', 5, 6, NULL, NULL, 'upcoming', FALSE, FALSE),
('2024-11-01', '19:30', 7, 8, NULL, NULL, 'upcoming', FALSE, FALSE),
('2024-11-02', '17:00', 2, 5, NULL, NULL, 'upcoming', FALSE, FALSE),
('2024-11-02', '19:00', 4, 7, NULL, NULL, 'upcoming', FALSE, FALSE);

INSERT INTO champions (year, team_id, finals) VALUES
(2023, 1, 'Ледяные Волки 4 - 2 Огненные Ястребы'),
(2022, 2, 'Огненные Ястребы 4 - 3 Стальные Медведи'),
(2021, 4, 'Золотые Тигры 4 - 1 Снежные Барсы');