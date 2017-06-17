import UniversalRouter from 'universal-router';

const routes = [
  {
    path: '/',
    action: () => '<h1>Home</h1>',
  },
  {
    path: '/posts',
    action: () => console.log('checking child routes for /posts'),
    children: [
      {
        path: '/',
        action: () => '<h1>Posts</h1>',
      },
      {
        path: '/:id',
        action: context => `<h1>Post #${context.params.id}</h1>`,
      },
    ],
  },
];

export default new UniversalRouter(routes);
