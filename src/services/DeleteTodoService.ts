import { getRepository } from 'typeorm';

import Todo from '../models/Todos';

import AppError from '../errors/AppError';

interface Request {
  id: string;
  user_id: string;
}

class DeleteTodoService {
  public async execute({ id, user_id }: Request): Promise<void> {
    const todoRepository = getRepository(Todo);

    const isUserTodo = await todoRepository.findOne({
      where: { id, user_id },
    });

    if (!isUserTodo) {
      throw new AppError('Todo does not exist', 400);
    }

    await todoRepository.delete(id);
  }
}

export default DeleteTodoService;
