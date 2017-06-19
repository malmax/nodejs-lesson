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
          action: context => ({
            title: `Post ${context.params.id}`,
            data: `The Post ${context.params.id}`,
          }),
        },
      ],
    },
    {
      path: '/auth',
      action: ({ next, body }) => {
        console.log('Auth module', body);
        const response = next();
        return response;
      },
      children: require('./AuthRoute').default({ db }),
    },
  ];

  return new UniversalRouter(routes);
};
