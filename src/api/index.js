export default ({ express, db, user }) => {
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

  return router;
};
