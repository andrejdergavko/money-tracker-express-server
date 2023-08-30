import { inject, injectable } from 'inversify';
import { ITransactionsRepository } from './transactions.repository.interface';
import { TYPES } from '../types';
import { PrismaService } from '../database/prisma.service';
import { Transaction } from './transactions.entity';
import { TransactionModel } from '@prisma/client';

@injectable()
export class TransactionsRepository implements ITransactionsRepository {
  constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

  async createMany(newTransactions: Transaction[]): Promise<boolean> {
    await newTransactions.forEach(async (transaction) => {
      await this.prismaService.client.transactionModel.create({
        data: transaction,
      });
    });

    return true;
  }

  getOne(uuid: string): Promise<TransactionModel | null> {
    return this.prismaService.client.transactionModel.findFirst({
      where: {
        uuid,
      },
    });
  }

  getAll(): Promise<TransactionModel[]> {
    return this.prismaService.client.transactionModel.findMany();
  }
}
