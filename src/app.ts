import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(@inject(TYPES.Logger) private logger: ILogger) {
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {}

  useRoutes(): void {}

  useExaptionFilters(): void {}

  public init(): void {
    this.useMiddleware();
    this.useRoutes();
    this.useExaptionFilters();
    this.server = this.app.listen(this.port);

    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }

  public close(): void {
    this.server.close();
  }
}
