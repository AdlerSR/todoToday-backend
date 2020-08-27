import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/Users';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
  avatar: string;
}
class CreateUserService {
  public async execute({
    name,
    email,
    password,
    avatar,
  }: Request): Promise<User> {
    const userRepository = getRepository(User);

    const emailExists = await userRepository.findOne({ where: { email } });

    if (emailExists) {
      throw new AppError('Email already exists', 400);
    }

    const hashPassword = await hash(password, 8);

    const user = userRepository.create({
      name,
      email,
      password: hashPassword,
      avatar,
    });

    await userRepository.save(user);

    return user;
  }
}

export default CreateUserService;
