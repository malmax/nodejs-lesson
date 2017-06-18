const taskModel = require('./model').default('task');

export default (server) => {
  const router = server.Router();

  router.get('/tasks', (req, res) => {
    taskModel.list(data => res.json(data));
  });

  router.post('/tasks/add', (req, res) => {
    taskModel.list(data => res.json(data));
  });
};
