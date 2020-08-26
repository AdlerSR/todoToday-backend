import { Router } from 'express';
import { getRepository } from 'typeorm';

import Todo from '../models/Todos';

import CreateTodoService from '../services/CreateTodoService';
import DeleteTodoService from '../services/DeleteTodoService';
import ShowTodoStatusService from '../services/ShowTodoStatusService';
import UpdateTodoCheckService from '../services/UpdateTodoCheckService';

import verifyAuth from '../middlewares/verifyAuth';

const todoRouter = Router();

todoRouter.use(verifyAuth);

todoRouter.get('/', async (req, res) => {
  const todoRepository = getRepository(Todo);

  const todo = await todoRepository.find({
    where: {
      user_id: req.user.id,
      checked: false,
    },
  });

  return res.json(todo);
});

todoRouter.post('/', async (req, res) => {
  const { title, content } = req.body;

  const todoService = new CreateTodoService();

  const todo = await todoService.execute({
    title,
    user_id: req.user.id,
    content,
  });

  return res.json(todo);
});

todoRouter.patch('/check', async (req, res) => {
  const { id, checked } = req.body;

  const todoService = new UpdateTodoCheckService();

  const todo = await todoService.execute({ id, user_id: req.user.id, checked });

  return res.json(todo);
});

todoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const todoService = new DeleteTodoService();

  const todo = await todoService.execute({ id, user_id: req.user.id });

  return res.json(todo);
});

todoRouter.get('/status', async (req, res) => {
  const todoService = new ShowTodoStatusService();

  const todo = await todoService.execute({ user_id: req.user.id });
  return res.json(todo);
});

export default todoRouter;
