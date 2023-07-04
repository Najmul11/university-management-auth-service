import express, { Application, NextFunction, Request, Response } from 'express';
import cors from 'cors';
import config from './config/index';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import { routes } from './app/routes';
import httpStatus from 'http-status';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Application routes
app.use('/api/v1', routes);

// testing
app.get('/', (req: Request, res: Response) => {
  res.send(`Server running on ${config.port}`);
});

// middlewares
app.use(globalErrorHandler);

// handle not found
app.use((req: Request, res: Response, next: NextFunction) => {
  res.status(httpStatus.NOT_FOUND).json({
    success: false,
    message: 'Not Found',
    errorMessages: [
      {
        path: req.originalUrl,
        message: 'API Not Found',
      },
    ],
  });
  next();
});

export default app;
