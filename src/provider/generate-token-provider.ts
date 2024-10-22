import { sign } from 'jsonwebtoken';
import { env } from 'node:process';

class GenerateTokenProvider {
  async execute(userId: string) {
    const token = sign({}, env.SECRET, {
      subject: userId,
      expiresIn: '20s',
    });

    return token;
  }
}

export { GenerateTokenProvider };
