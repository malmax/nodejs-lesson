export default ({ express, db, passport }) => {
  const router = express.Router();
  const taskModel = require('./model').default({ table: 'tasks', db });

  router.get('/tasks', (req, res) => {
    taskModel.list(data => res.json(data));
  });

  router.get('/tasks/add', (req, res) => {
    const insert = {
      title: 'some title',
      text: 'Lorem ipsum ...',
      complete: 0,
    };
    taskModel.add(insert, data => res.json(data));
  });


  // auth
  router.post('/auth/login', passport.authenticate('local'),
  (req, res) => {
    // If this function gets called, authentication was successful.
    // `req.user` contains the authenticated user.
    res.redirect(`/users/${req.user.username}`);
  });

  return router;
};
