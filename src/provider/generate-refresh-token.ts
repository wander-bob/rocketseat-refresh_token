import dayjs from 'dayjs';
import { client } from '../prisma/client';

class GenerateRefreshToken {
  async execute(userId: string) {
    const expiresIn = dayjs().add(15, 'seconds').unix();

    const generatedRefreshToken = await client.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return generatedRefreshToken;
  }
}

export { GenerateRefreshToken };
