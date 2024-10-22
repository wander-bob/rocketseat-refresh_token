import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

export function ensureAuthenticate(request: Request, response: Response, next: NextFunction) {
  const [, authToken] = request.headers.authorization?.split('Bearer ');

  if (!authToken) {
    throw new Error('Unauthorized');
  }

  try {
    verify(authToken, 'j31yg43iua897asdfg05oimn5');
    next();
  } catch (error) {
    throw new Error('Unauthorized');
  }
}
