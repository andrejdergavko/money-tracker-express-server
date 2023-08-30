import { injectable } from 'inversify';
import { ITransactionsService } from './transactions.service.interface';

@injectable()
export class TransactionsService implements ITransactionsService {
  getTransactions(): Promise<any[]> {
    return Promise.resolve([{ id: 1, name: 'test' }]);
  }
}
