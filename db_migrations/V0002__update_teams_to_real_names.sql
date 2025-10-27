ALTER TABLE teams ADD COLUMN division VARCHAR(50);

UPDATE teams SET name = 'Адмирал', city = 'Владивосток', arena = 'Фетисов Арена', division = 'Восток' WHERE id = 1;
UPDATE teams SET name = 'Лада', city = 'Тольятти', arena = 'Лада Арена', division = 'Запад' WHERE id = 2;
UPDATE teams SET name = 'ЦСКА', city = 'Москва', arena = 'ЦСКА Арена', division = 'Запад' WHERE id = 3;
UPDATE teams SET name = 'СКА', city = 'Санкт-Петербург', arena = 'Ледовый дворец', division = 'Запад' WHERE id = 4;
UPDATE teams SET name = 'Сочи', city = 'Сочи', arena = 'Большой', division = 'Центр' WHERE id = 5;
UPDATE teams SET name = 'Металлург', city = 'Магнитогорск', arena = 'Арена Металлург', division = 'Восток' WHERE id = 6;
UPDATE teams SET name = 'Амур', city = 'Хабаровск', arena = 'Платинум Арена', division = 'Восток' WHERE id = 7;
UPDATE teams SET name = 'Ак Барс', city = 'Казань', arena = 'Татнефть Арена', division = 'Центр' WHERE id = 8;

UPDATE champions SET finals = 'Адмирал 4 - 2 Лада' WHERE year = 2023;
UPDATE champions SET finals = 'Лада 4 - 3 ЦСКА' WHERE year = 2022;
UPDATE champions SET finals = 'СКА 4 - 1 Металлург' WHERE year = 2021;
