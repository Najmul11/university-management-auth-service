import mongoose from 'mongoose';
import config from './config';
import app from './app';
import { logger, errorlogger } from './shared/logger';
import { Server } from 'http';

let server: Server;

process.on('uncaughtException', error => {
  errorlogger.error(error);
  process.exit(1);
});

async function bootstrap() {
  try {
    // mongodb://127.0.0.1:27017/university-management
    // DATABASE_URL=mongodb+srv://university-admin:lte85r2kIAPyvDYO@cluster0.u5tj5cw.mongodb.net/university-management?retryWrites=true&w=majority
    await mongoose.connect(config.database_url as string);
    logger.info('Database connected successfully');

    server = app.listen(config.port, () => {
      logger.info(`Application listening on port ${config.port}`);
    });
  } catch (error) {
    errorlogger.error('Failed to connect', error);
  }
  process.on('unhandledRejection', error => {
    if (server) {
      server.close(() => {
        errorlogger.error(error);
        process.exit(1);
      });
    } else {
      process.exit(1);
    }
  });
}

bootstrap();

process.on('SIGTERM', () => {
  logger.info('SIGTERM is received');
  if (server) {
    server.close();
  }
});
