import { client } from '../../prisma/client';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { GenerateRefreshToken } from '../../provider/generate-refresh-token';
import { GenerateTokenProvider } from '../../provider/generate-token-provider';

interface IRequest {
  email: string;
  password: string;
}

class AuthenticateUserUseCase {
  async execute({ email, password }: IRequest) {
    const userAlreadyExists = await client.user.findUnique({
      where: {
        email,
      },
    });

    if (!userAlreadyExists) {
      throw new Error('User or password incorrect.');
    }

    const passwordMatch = await compare(password, userAlreadyExists.password);

    if (!passwordMatch) {
      throw new Error('User or password incorrect.');
    }

    const generateTokenProvider = new GenerateTokenProvider();

    const generatedRefreshToken = new GenerateRefreshToken();

    const token = await generateTokenProvider.execute(userAlreadyExists.id);

    const refreshToken = await generatedRefreshToken.execute(userAlreadyExists.id);

    return { token, refreshToken };
  }
}

export { AuthenticateUserUseCase };
