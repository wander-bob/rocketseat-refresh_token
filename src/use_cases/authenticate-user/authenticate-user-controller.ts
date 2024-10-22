import { Request, Response } from 'express';
import { AuthenticateUserUseCase } from './authenticate-user-use-case';
export class AuthenticateUserController {
  async handle(request: Request, response: Response) {
    const { email, password } = request.body;

    const authenticateUserUseCase = new AuthenticateUserUseCase();

    const { token } = await authenticateUserUseCase.execute({
      email,
      password,
    });

    response.json(token);
  }
}
