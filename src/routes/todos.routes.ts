import { Router } from 'express';
import { getRepository } from 'typeorm';
import Todo from '../models/Todos';

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

  const todoRepository = getRepository(Todo);

  const todoCreate = todoRepository.create({
    title,
    user_id: req.user.id,
    content,
  });

  todoRepository.save(todoCreate);

  return res.json(todoCreate);
});

todoRouter.patch('/check', async (req, res) => {
  const { id, checked } = req.body;

  const todoRepository = getRepository(Todo);

  const findTodo = await todoRepository.findOne({
    where: { id },
  });

  const todo = await todoRepository.create({
    ...findTodo,
    checked,
  });

  await todoRepository.save(todo);

  return res.json(todo);
});

todoRouter.delete('/:id', async (req, res) => {
  const { id } = req.params;

  const todoRepository = getRepository(Todo);

  await todoRepository.delete(id);

  return res.status(200).send();
});

todoRouter.get('/status', async (req, res) => {
  const todoRepository = getRepository(Todo);

  const doneTodo = await todoRepository.find({
    where: { user_id: `${req.user.id}`, checked: true },
  });

  const unfinishedTodo = await todoRepository.find({
    where: { user_id: `${req.user.id}`, checked: false },
  });

  const doneTodoSize = Object.keys(doneTodo).length;
  const unfinishedTodoSize = Object.keys(unfinishedTodo).length;

  return res.json({ done: doneTodoSize, unfinished: unfinishedTodoSize });
});

export default todoRouter;
