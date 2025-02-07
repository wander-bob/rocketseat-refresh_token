import { Request, Response } from 'express';
import { CreateUserUseCase } from './create-user-use-case';

export class CreateUserController {
  async handle(request: Request, response: Response) {
    const { name, email, password } = request.body;

    const createUserUseCase = new CreateUserUseCase();

    const user = await createUserUseCase.execute({
      name,
      email,
      password,
    });

    response.json(user);
  }
}
