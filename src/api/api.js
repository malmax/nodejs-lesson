export default ({ express, db, passport }) => {
  const router = express.Router();
  const taskModel = require('./model').default({ table: 'tasks', db });

  // Получение всех задач
  router.get('/tasks', (req, res) => {
    taskModel.list(data => res.json(data));
  });

  // новая задача
  router.post('/tasks/add', (req, res) => {
    req.requireAuth();

    const insert = {
      title: req.body.title || 'some title',
      text: req.body.text || 'Lorem ipsum ...',
      complete: 0,
    };
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

  return router;
};
