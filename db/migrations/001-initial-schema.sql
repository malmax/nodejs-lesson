--------------------------------------------------------------------------------
-- Up
--------------------------------------------------------------------------------

CREATE TABLE tasks (id INTEGER PRIMARY KEY, title TEXT, `text` TEXT, `completed` INTEGER);
CREATE TABLE users (id INTEGER PRIMARY KEY, username TEXT, password TEXT);

INSERT INTO users VALUES (NULL, 'malmax.spb@gmail.com', 'secret');
INSERT INTO tasks VALUES (NULL, 'Сделать ДЗ7', 'Необходимо сделать и залить в ГИТ ДЗ по уроку номер 7', 0);
INSERT INTO tasks VALUES (NULL, 'Булка', 'Необходимо купить в магазине Булку и Хлеб', 0);

--------------------------------------------------------------------------------
-- Down
--------------------------------------------------------------------------------

DROP TABLE tasks;
DROP TABLE users;
