import { inject, injectable } from 'inversify';

import { BaseController } from '../common/base.controller';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import { ITransactionsController } from './transactions.controller.interface';
import { NextFunction, Request, Response, Router } from 'express';
import { ITransactionsService } from './transactions.service.interface';
import { HTTPError } from '../errors/http-error.class';

@injectable()
export class TransactionsController extends BaseController implements ITransactionsController {
  constructor(
    @inject(TYPES.Logger) private loggerService: ILogger,
    @inject(TYPES.TransactionsService) private transactionsService: ITransactionsService,
  ) {
    super(loggerService);

    this.bindRoutes([
      {
        path: '/',
        method: 'get',
        func: this.getAllTransactions,
        middlewares: [],
      },
    ]);
  }

  async getAllTransactions(req: Request, res: Response, next: NextFunction): Promise<void> {
    const result = await this.transactionsService.getTransactions();

    if (!result) {
      return next(new HTTPError(422, 'Error while getting transactions'));
    }

    res.send(result);
  }
}
