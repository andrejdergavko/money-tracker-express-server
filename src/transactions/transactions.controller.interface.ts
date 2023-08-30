import { NextFunction, Request, Response, Router } from 'express';
import { BaseController } from '../common/base.controller';

export interface ITransactionsController extends BaseController {
  getAllTransactions: (req: Request, res: Response, next: NextFunction) => void;
}
