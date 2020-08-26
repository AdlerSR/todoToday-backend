import { getRepository } from 'typeorm';

import Todo from '../models/Todos';

interface Request {
  user_id: string;
}

interface Return {
  done: number;
  unfinished: number;
}

class ShowTodoStatusService {
  public async execute({ user_id }: Request): Promise<Return> {
    const todoRepository = getRepository(Todo);

    const doneTodo = await todoRepository.find({
      where: { user_id, checked: true },
    });

    const unfinishedTodo = await todoRepository.find({
      where: { user_id, checked: false },
    });

    const done = Object.keys(doneTodo).length;
    const unfinished = Object.keys(unfinishedTodo).length;

    return { done, unfinished };
  }
}

export default ShowTodoStatusService;
