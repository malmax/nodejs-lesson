export default ({ express, db, passport }) => {
  const router = express.Router();
  const taskModel = require('./model').default({ table: 'tasks', db });

  // Получение всех задач
  router.get('/tasks', (req, res) => {
    if (__DEV__) { console.log('api:', 'GET: /api/tasks'); }
    taskModel.list(data => res.json(data));
  });

  router.put('/tasks/:id', (req, res) => {
    if (__DEV__) { console.log('api:', `PUT: /api/tasks/${req.params.id}`); }
    taskModel.complete(req.params.id, data => res.json(data));
  });

  // новая задача
  router.post('/tasks/add', (req, res) => {
    req.requireAuth();

    const insert = {
      title: req.body.title || 'some title',
      text: req.body.text || 'Lorem ipsum ...',
      complete: 0,
    };
    if (__DEV__) { console.log('api:', 'POST: /api/tasks/add', insert); }

    taskModel.add(insert, data => res.json(data));
  });


  // auth
  router.post('/auth/login', passport.authenticate('local',
    { failureRedirect: '/auth/login',
      successRedirect: '/' }));

  router.get('/auth/logout', (req, res) => {
    req.logout();
    res.redirect('/');
  });

  router.get('/auth/isLogin', (req, res) => {
    if (__DEV__) { console.log('api:', 'GET: /auth/isLogin', req.isAuthenticated()); }
    res.json(req.isAuthenticated());
  });

  return router;
};
