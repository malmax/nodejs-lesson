import express from 'express';
import bodyParser from 'body-parser';
import expressSession from 'express-session';
import React from 'react';
import ReactDOMServer from 'react-dom/server';
import Promise from 'bluebird';
import db from 'sqlite';

import config from './config';

// Лечим ошибку RegeneratorRunrime
require('babel-polyfill');

import Html from './Components/Html';

// Сздаем сервер
const server = express();
server.use(expressSession({ secret: 'MySecret' }));
server.use(bodyParser.urlencoded({ extended: false }));
server.use('/public', express.static('dist/public'));

import passport from 'passport';

server.use(passport.initialize());
server.use(passport.session());
const Strategy = require('passport-local').Strategy;

passport.use(new Strategy({
  usernameField: 'email',
  passwordField: 'password',
},
  (username, password, done) => {
    Promise.resolve()
      .then(() => db.get('SELECT * FROM users WHERE username = ? AND password = ?',
        username, password))
      .then((user) => {
        if (!user) {
          done(null, false);
          return;
        }
        console.log('authentificated', user.username);
        done(null, { id: user.id, email: user.username });
      });
  }),
);

passport.serializeUser((user, done) => {
  done(null, user.id);
});


passport.deserializeUser((id, done) => {
  Promise.resolve()
  .then(() => db.get('SELECT * FROM users WHERE id = ?', id))
  .then(user => done(null, { id: user.id, email: user.username }))
  .catch(err => done(err));
});


// аутентификация
server.use((req, res, next) => {
  // добавляем функцию requireAuth в req
  // если пользователь аутентифицирован - возвращаем true
  // нет - производим редирект
  req.requireAuth = () => {
    // console.log(req);
    if (!req.isAuthenticated()) {
      // console.log('you have to authenticate');
      res.redirect('/auth/login');
      next(new Error('требуется авторизация'));
      return false;
    }
  };

  next();
});

// Роуты для Api
const apiRoutes = require('./api').default({ express, db, passport });
// Роуты для страниц
const routes = require('./routes').default({ db });

// ИСпользуем роуты Api
server.use('/api', apiRoutes);
// используем роутер страниц
server.get('*', (req, res) => {
  // console.log('request', req.path);
  routes.resolve({ path: req.path, requireAuth: req.requireAuth, config })
  .then((result) => {
    // console.log(result);
    const element = React.createElement(Html, result);
    // console.log(element);
    const content = ReactDOMServer.renderToStaticMarkup(element);
    // console.log(content);
    res.send(content);
  }).catch((err) => {
    if (__DEV__) {
      console.error(err);
    }
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
  .finally(() => server.listen(config.port, () => {
    console.log(`Listen ${config.baseUrl}`);
  }));
