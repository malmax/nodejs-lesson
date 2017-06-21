import React from 'react';
import UniversalRouter from 'universal-router';
import Tasks from '../Components/Tasks';

// прокидываем базу
export default () => {
  const routes = [
    {
      path: '/',
      action: () => ({ title: 'Home', data: 'Home page' }),
    },
    {
      path: '/tasks',
      async action({ next }) {
        console.log('middleware: start');
        const child = await next();
        console.log('middleware: end');

        return child;
      },
      children: [
        {
          path: '/',
          action: () => ({ title: 'Задачи', data: <Tasks /> }),
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
