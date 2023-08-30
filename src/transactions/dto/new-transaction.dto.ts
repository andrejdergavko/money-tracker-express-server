export class NewTransactionDto {
  uuid: string;
  userId: string;
  date: string;
  currency: string;
  description?: string;
  amount: number;
  amountInUsd: number;
  bank: string;
  categoryUuid?: string;
}
