export interface Jineteo{
  id: number;
  creditCardId: number;
  userId: number;
  amount: number;
  misses: number;
  typeOfTransactionId: number;
  typeOfJineteoId: number;
  observation?: string;
  date: Date;
}
