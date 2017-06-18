import UniversalRouter from 'universal-router';

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
];

export default new UniversalRouter(routes);
