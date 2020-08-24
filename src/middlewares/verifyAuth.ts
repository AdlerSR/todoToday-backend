import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function verifyAuth(
  req: Request,
  res: Response,
  next: NextFunction,
): void {
  const jwtToken = req.headers.authorization;

  if (!jwtToken) {
    throw new Error('Token JWT is missing');
  }

  const [, token] = jwtToken.split(' ');

  try {
    const tokenVerify = verify(token, 'b78bc8e4d5c6f95eb478835e5fd0097e');

    const { sub } = tokenVerify as TokenPayload;

    req.user = {
      id: sub,
    };

    return next();
  } catch {
    throw new Error('Invalid token JWT');
  }
}
