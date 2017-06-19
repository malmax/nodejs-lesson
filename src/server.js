import express from 'express';
import bodyParser from 'body-parser';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Promise from 'bluebird';
import db from 'sqlite';

import Html from './Components/Html';

// Сздаем сервер
const server = express();
// parse application/x-www-form-urlencoded
server.use(bodyParser.urlencoded({ extended: false }));

// аутентификация
server.use((req, res, next) => {
  // добавляем функцию requireAuth в req
  // если пользователь аутентифицирован - возвращаем true
  // нет - производим редирект
  req.requireAuth = () => {

  };
  next();
});

// Роуты для Api
const apiRoutes = require('./api/index').default({ express, db });
// Роуты для страниц
const routes = require('./routes').default({ db });

// ИСпользуем роуты Api
server.use('/api', apiRoutes);
// используем роутер страниц
server.get('*', (req, res) => {
  console.log('Request:', req.path);
  routes.resolve({ path: req.path, body: req.body }).then((result) => {
    const element = React.createElement(Html, {
      data: result.data,
      title: result.title,
    });
    res.send(ReactDOMServer.renderToStaticMarkup(element));
  }).catch(() => {
    res.status(404);
    // default to plain-text. send()
    res.type('txt').send('Page not found');
  });
});

// запускаем БД и сервер
Promise.resolve()
  // First, try connect to the database and update its schema to the latest version
  .then(() => db.open('./db/database.sqlite', { Promise }))
  .then(() => db.migrate({ force: 'last', migrationsPath: './db/migrations' }))
  .catch(err => console.error(err.stack))
  // Finally, launch Node.js app
  .finally(() => server.listen(8090, () => {
    console.log('Listen 8090');
  }));
