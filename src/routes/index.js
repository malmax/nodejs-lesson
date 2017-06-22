import React from 'react';
import UniversalRouter from 'universal-router';
import Tasks from '../Components/Tasks';

// Лечим ошибку RegeneratorRunrime
require('babel-polyfill');

if (SERVER) {
  const fetch = require('isomorphic-fetch');
} else {
  const fetch = require('whatwg-fetch');
}

// прокидываем базу
export default () => {
  const routes = [
    {
      path: '/',
      action: () => ({ title: 'Home', data: 'Home page' }),
    },
    {
      path: '/restrict/area',
      action: ({ requireAuth }) => {
        if (requireAuth) requireAuth();
        return ({ title: 'Restricted Area', data: 'Если Вы видите это сообщение, значит Вы авторизованы' });
      },
    },
    {
      path: '/tasks',
      async action({ next }) {
        // console.log('middleware: start');
        const child = await next();
        // console.log('middleware: end');

        return child;
      },
      children: [
        {
          path: '/',
          async action({ config }) {
            let tasks = [];
            if (SERVER) {
              tasks = await fetch(`${config.baseUrl}/api/tasks`)
                .then((response) => {
                  if (response.status >= 400) {
                    throw new Error('Bad response from server');
                  }
                  return response.json();
                });
            }
            const component = (<Tasks initial={tasks} />);
            return ({ title: 'Задачи', data: component, initial: tasks });
          },
        },
        {
          path: '/:id',
          action: ({ params, requireAuth }) => {
            // в этот раздел можно попасть только если аутентифицирован
            if (requireAuth) requireAuth();
            return ({
              title: `Post ${params.id}`,
              data: `The Post ${params.id}`,
            });
          },
        },
      ],
    },
    {
      path: '/auth',
      action: ({ next }) => {
        // console.log('Auth module');
        const response = Promise.resolve().then(() => next());
        return response;
      },
      children: require('./AuthRoute').default(),
    },
  ];

  return new UniversalRouter(routes);
};
