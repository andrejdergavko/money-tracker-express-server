import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from '../common/base.controller';

export interface ITransactionsController extends BaseController {
  getTransactions: (req: Request, res: Response, next: NextFunction) => void;
  addTransactions: (req: Request, res: Response, next: NextFunction) => void;
}
