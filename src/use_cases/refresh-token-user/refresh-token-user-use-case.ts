import dayjs from 'dayjs';
import { client } from '../../prisma/client';
import { GenerateTokenProvider } from '../../provider/generate-token-provider';
import { GenerateRefreshToken } from '../../provider/generate-refresh-token';

class RefreshTokenUserUseCase {
  async execute(refresh_token: string) {
    const refreshToken = await client.refreshToken.findFirst({
      where: {
        id: refresh_token,
      },
    });

    if (!refreshToken) {
      throw new Error('Session expired');
    }

    const isRefreshTokenExpired = dayjs().isAfter(dayjs.unix(refreshToken.expiresIn));
    const generateTokenProvider = new GenerateTokenProvider();
    const token = await generateTokenProvider.execute(refreshToken.userId);

    if (isRefreshTokenExpired) {
      await client.refreshToken.deleteMany({
        where: {
          userId: refreshToken.userId,
        },
      });

      throw new Error('Session expired.');
    }

    return { token };
  }
}

export { RefreshTokenUserUseCase };
