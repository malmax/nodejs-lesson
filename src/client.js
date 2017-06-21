import React from 'react';
import ReactDom from 'react-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import Root from './Components/Root/Root';
// import polyfill from './polyfill';

// Лечим ошибку RegeneratorRunrime
require('babel-polyfill');
// polyfill();
// Роуты для страниц
const routes = require('./routes').default();


// Navigation manager, e.g. history.push('/home')
// https://github.com/mjackson/history
const history = createBrowserHistory();

history.listen((location, action) => {
  // location is an object like window.location
  console.log(action, location.pathname, location.state);
  routes.resolve({ path: location.pathname, requireAuth: () => true })
  .then((result) => {
    const element = React.createElement(Root, {
      data: result.data,
      title: result.title,
    });
    ReactDom.render(element, document.getElementById('root'));
  }).catch((err) => {
    if (__DEV__) {
      console.error(err);
    }
    const element = React.createElement(Root, {
      data: 'Страница не найдена',
      title: '404',
    });
    ReactDom.render(element, document.getElementById('root'));
  });
});

history.push('/tasks');
