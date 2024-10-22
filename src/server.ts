import 'express-async-errors';
import express, { Request, Response, NextFunction } from 'express';
import { router } from './routes/router';

const app = express();

app.use(express.json());
app.use(router);

app.use((error: Error, request: Request, response: Response, next: NextFunction) => {
  response.status(400).json({
    status: 'Error',
    message: error.message,
  });
  return;
});

app.listen(3333, () => {
  console.log(`[start]: server is running on port ${3333}`);
});
