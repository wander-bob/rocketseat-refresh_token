import { Router } from 'express';
import { CreateUserController } from '../use_cases/create-user/create-user-controller';
import { AuthenticateUserController } from '../use_cases/authenticate-user/authenticate-user-controller';
import { ensureAuthenticate } from '../middlewares/ensure-authenticated';
import { RefreshTokenUserController } from '../use_cases/refresh-token-user/refresh-token-user-controller';

const router = Router();

const createUserController = new CreateUserController();
const authenticateUserController = new AuthenticateUserController();
const refreshTokenController = new RefreshTokenUserController();

router.post('/users', createUserController.handle);
router.post('/login', authenticateUserController.handle);
router.post('/refresh-token', refreshTokenController.handle);

router.get('/courses', ensureAuthenticate, (request, response) => {
  response.json([
    { id: 1, name: 'NodeJS' },
    { id: 2, name: 'ReactJS' },
    { id: 3, name: 'React Native' },
    { id: 4, name: 'Flutter' },
    { id: 5, name: 'Elixir' },
  ]);
});

export { router };
