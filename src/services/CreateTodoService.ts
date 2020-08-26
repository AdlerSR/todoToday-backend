import { getRepository } from 'typeorm';
import { validate } from 'class-validator';
import Todo from '../models/Todos';
import AppError from '../errors/AppError';

interface Request {
  title: string;
  content: string;
  user_id: string;
}
class CreateUserService {
  public async execute({ title, content, user_id }: Request): Promise<Todo> {
    const todoRepository = getRepository(Todo);

    const todo = todoRepository.create({ title, content, user_id });
    const errors = await validate(todo);

    if (errors.length > 0) {
      throw new AppError(`Validation failed!`);
    }

    await todoRepository.save(todo);

    return todo;
  }
}

export default CreateUserService;
