import { TransactionModel } from '@prisma/client';
import { NewTransactionDto } from './dto/new-transaction.dto';

export interface ITransactionsService {
  addTransactions(dto: NewTransactionDto[]): Promise<boolean>;
  getTransactions(): Promise<TransactionModel[]>;
}
