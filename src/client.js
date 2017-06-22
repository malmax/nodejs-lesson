import React from 'react';
import ReactDom from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Root from './Components/Root/Root';

// Лечим ошибку RegeneratorRunrime
require('babel-polyfill');

// Роуты для страниц
const routes = require('./routes').default();
// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
const history = createBrowserHistory();

require('whatwg-fetch');
function isAuth() {
  console.log('try to auth');
  return fetch('/api/auth/isLogin', {
    credentials: 'same-origin',
  })
    .then(response => response.json())
    .then((response) => {
      if (!response) history.replace('/auth/login');
      return response;
    });
}


history.listen((location, action) => {
  // console.log('Client rendering', location.pathname, location.state);
  routes.resolve({ path: location.pathname, requireAuth: isAuth })
  .then((result) => {
    const element = React.createElement(Root, {
      title: result.title,
      history,
    }, result.data);
    // console.log(element);
    ReactDom.render(element, document.getElementById('root'));
  }).catch((err) => {
    if (__DEV__) {
      console.error(err);
    }
    const element = React.createElement(Root, {
      title: '404',
    }, 'Страница не найдена');
    ReactDom.render(element, document.getElementById('root'));
  });
});

history.push(history.location);
