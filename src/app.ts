import express, { Express } from 'express';
import { Server } from 'http';
import { inject, injectable } from 'inversify';
import 'reflect-metadata';
import { json } from 'body-parser';

import { TYPES } from './types';
import { ILogger } from './logger/logger.interface';
import { ITransactionsController } from './transactions/transactions.controller.interface';
import { IExaptionFilter } from './errors/exaption.filter.interface';
import { PrismaService } from './database/prisma.service';

@injectable()
export class App {
  app: Express;
  server: Server;
  port: number;

  constructor(
    @inject(TYPES.Logger) private logger: ILogger,
    @inject(TYPES.TransactionsController) private transactionsController: ITransactionsController,
    @inject(TYPES.ExaptionFilter) private exaptionFilter: IExaptionFilter,
    @inject(TYPES.PrismaService) private prismaService: PrismaService,
  ) {
    this.app = express();
    this.port = 8000;
  }

  useMiddleware(): void {
    this.app.use(json());
  }

  useRoutes(): void {
    this.app.use('/transactions', this.transactionsController.router);
  }

  useExaptionFilters(): void {
    this.app.use(this.exaptionFilter.catch.bind(this.exaptionFilter));
  }

  public async init(): Promise<void> {
    this.useMiddleware();
    this.useRoutes();
    this.useExaptionFilters();
    await this.prismaService.connect();
    this.server = this.app.listen(this.port);

    this.logger.log(`Сервер запущен на http://localhost:${this.port}`);
  }

  public close(): void {
    this.server.close();
  }
}
