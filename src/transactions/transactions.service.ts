import { inject, injectable } from 'inversify';
import { ITransactionsService } from './transactions.service.interface';
import { NewTransactionDto } from './dto/new-transaction.dto';
import { Transaction } from './transactions.entity';
import { TYPES } from '../types';
import { ITransactionsRepository } from './transactions.repository.interface';
import { TransactionModel } from '@prisma/client';

@injectable()
export class TransactionsService implements ITransactionsService {
  constructor(
    @inject(TYPES.TransactionsRepository) private transactionsRepository: ITransactionsRepository,
  ) {}

  async addTransactions(transactions: NewTransactionDto[]): Promise<boolean> {
    const newTransactions = transactions.map((transaction) => {
      return new Transaction(transaction);
    });

    await this.transactionsRepository.createMany(newTransactions);

    return true;
  }

  getTransactions(): Promise<TransactionModel[]> {
    return this.transactionsRepository.getAll();
  }
}
