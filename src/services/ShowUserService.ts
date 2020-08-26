import { getRepository } from 'typeorm';

import User from '../models/Users';

interface Request {
  user_id: string;
}

class ShowUserService {
  public async execute({ user_id }: Request): Promise<User | void> {
    const userRepository = getRepository(User);

    const user = await userRepository.findOne({ where: { id: user_id } });

    delete user?.password;

    return user;
  }
}

export default ShowUserService;
