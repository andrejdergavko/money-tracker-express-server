import { TransactionModel } from '@prisma/client';

import { Transaction } from './transactions.entity';

export interface ITransactionsRepository {
  createMany: (transactions: Transaction[]) => Promise<boolean>;
  getOne: (uuid: string) => Promise<TransactionModel | null>;
  getAll: () => Promise<TransactionModel[]>;
}
