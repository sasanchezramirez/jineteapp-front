export interface Payment{
  id: number;
  creditCardId: number;
  userId: number;
  amount: number;
  observation?: string;
  date: Date;
}
