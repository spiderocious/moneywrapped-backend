import express, { Request, Response, NextFunction } from 'express';
import helmet from 'helmet';
import cors from 'cors';
import { corsConfig, envConfig } from '@configs';
import { rateLimiter } from '@middlewares';
import routes from '@routes';
import { ResponseUtil } from '@utils';
import { MESSAGE_KEYS } from '@shared/constants';
import { logger } from '@utils';

export class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.setupMiddleware();
    this.setupRoutes();
    this.setupErrorHandling();
  }

  private setupMiddleware(): void {
    this.app.use(helmet());
    this.app.use(cors(corsConfig));

    this.app.use(express.json({ limit: '10mb' }));
    this.app.use(express.urlencoded({ extended: true, limit: '10mb' }));

    this.app.use(rateLimiter);

    if (envConfig.isDevelopment) {
      this.app.use((req, res, next) => {
        logger.debug(`${req.method} ${req.path}`);
        next();
      });
    }
  }

  private setupRoutes(): void {
    this.app.use('/api', routes);

    this.app.use((req: Request, res: Response) => {
      const lang = ResponseUtil.extractLanguage(req);
      ResponseUtil.setLanguage(lang);
      ResponseUtil.notFound(res, MESSAGE_KEYS.NOT_FOUND);
    });
  }

  private setupErrorHandling(): void {
    this.app.use(
      (error: Error, req: Request, res: Response, next: NextFunction) => {
        logger.error('Unhandled application error', error);

        const lang = ResponseUtil.extractLanguage(req);
        ResponseUtil.setLanguage(lang);
        ResponseUtil.serverError(res, MESSAGE_KEYS.INTERNAL_SERVER_ERROR);
      }
    );
  }
}
