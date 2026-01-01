// Only register module-alias in production (when running from dist/)
if (!__filename.includes('/src/')) {
  require('module-alias/register');
}

import { App } from './app';
import { aiConfig, envConfig } from '@configs';
import { logger } from '@utils';
import { database } from '@utils';
import { analysisService } from '@services';

class Server {
  private app: App;

  constructor() {
    this.app = new App();
  }

  async start(): Promise<void> {
    try {
      await database.connect();

      // Mark pending analysis jobs as failed on server restart
      await analysisService.markPendingJobsAsFailed();

      const server = this.app.app.listen(envConfig.port, () => {
        logger.info(`Server running on port ${envConfig.port}`);
        logger.info(`Environment: ${envConfig.nodeEnv}`);
        logger.info(`API available at http://localhost:${envConfig.port}/api`);
      });

      this.setupGracefulShutdown(server);
    } catch (error) {
      logger.error('Failed to start server', error);
      process.exit(1);
    }
  }

  private setupGracefulShutdown(server: any): void {
    const shutdown = async (signal: string) => {
      logger.info(`${signal} received. Starting graceful shutdown...`);

      server.close(async () => {
        logger.info('HTTP server closed');

        try {
          await database.disconnect();
          logger.info('Database connection closed');
          process.exit(0);
        } catch (error) {
          logger.error('Error during shutdown', error);
          process.exit(1);
        }
      });

      setTimeout(() => {
        logger.error('Forced shutdown after timeout');
        process.exit(1);
      }, 10000);
    };

    process.on('SIGTERM', () => shutdown('SIGTERM'));
    process.on('SIGINT', () => shutdown('SIGINT'));

    process.on('uncaughtException', (error: Error) => {
      logger.error('Uncaught Exception', error);
      shutdown('UNCAUGHT_EXCEPTION');
    });

    process.on('unhandledRejection', (reason: any) => {
      logger.error('Unhandled Rejection', reason);
      shutdown('UNHANDLED_REJECTION');
    });
  }
}

const server = new Server();
server.start();
