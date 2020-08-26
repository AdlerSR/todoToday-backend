import { getRepository } from 'typeorm';

import AppError from '../errors/AppError';

import Todo from '../models/Todos';

interface Request {
  id: string;
  user_id: string;
  checked: boolean;
}

class UpdateTodoCheckService {
  public async execute({ id, user_id, checked }: Request): Promise<Todo> {
    const todoRepository = getRepository(Todo);

    const findTodo = await todoRepository.findOne({
      where: { id, user_id },
    });

    if (!findTodo) {
      throw new AppError('Todo does not exist', 400);
    }

    const newTodo = todoRepository.create({
      ...findTodo,
      checked,
    });

    const todo = await todoRepository.save(newTodo);

    return todo;
  }
}

export default UpdateTodoCheckService;
