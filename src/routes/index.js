import UniversalRouter from 'universal-router';
// прокидываем базу
export default ({ db }) => {
  const routes = [
    {
      path: '/',
      action: () => ({ title: 'Home', data: 'Home page' }),
    },
    {
      path: '/posts',
      action: () => console.log('checking child routes for /posts'),
      children: [
        {
          path: '/',
          action: () => ({ title: 'Posts', data: 'Posts' }),
        },
        {
          path: '/:id',
          action: ({ params, requireAuth }) => {
            // в этот раздел можно попасть только если аутентифицирован
            requireAuth();
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
      children: require('./AuthRoute').default({ db }),
    },
  ];

  return new UniversalRouter(routes);
};
