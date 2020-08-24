import { getRepository } from 'typeorm';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import User from '../models/Users';
import AppError from '../errors/AppError';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class CreateSessionService {
  public async execute({ email, password }: Request): Promise<Response> {
    const sessionRepository = getRepository(User);

    const user = await sessionRepository.findOne({ where: { email } });

    if (!user) {
      throw new AppError('Email or Password invalid', 400);
    }

    const passwordCompare = await compare(password, user.password);

    if (!passwordCompare) {
      throw new AppError('Email or Password invalid', 400);
    }

    const token = sign({}, 'b78bc8e4d5c6f95eb478835e5fd0097e', {
      expiresIn: '3d',
      subject: user.id,
    });

    return {
      user,
      token,
    };
  }
}

export default CreateSessionService;
