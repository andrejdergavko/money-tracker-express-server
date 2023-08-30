import { NewTransactionDto } from './dto/new-transaction.dto';

export class Transaction {
  public userId: string;
  public date: string;
  public currency: string;
  public description?: string;
  public amount: number;
  public amountInUsd: number;
  public bank: string;
  public categoryUuid?: string;

  constructor(transaction: NewTransactionDto) {
    this.userId = transaction.userId;
    this.date = transaction.date;
    this.currency = transaction.currency;
    this.description = transaction.description;
    this.amount = transaction.amount;
    this.amountInUsd = transaction.amountInUsd;
    this.bank = transaction.bank;
    this.categoryUuid = transaction.categoryUuid;
  }
}

// const mockTransaction = {
//   userId: '1',
//   date: '2022-01-01',
//   currency: 'USD',
//   description: 'test',
//   amount: 100,
//   amountInUsd: 100,
//   bank: 'test',
//   categoryUuid: '1',
// };

// const mockTransaction = {
//   "userId": "1",
//   "date": "2022-01-01",
//   "currency": "USD",
//   "description": "test",
//   "amount": 100,
//   "amountInUsd": 300,
//   "bank": "test",
//   "categoryUuid": "1"
// };
