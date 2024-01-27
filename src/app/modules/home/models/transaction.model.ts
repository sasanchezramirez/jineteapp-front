export interface TransactionResponse {
  success: boolean;
  message: string;
  data: TransactionData;
  code: string;
}

export interface TransactionData {
  id: number;
  creditCardId: number;
  userId: number;
  typeOfJineteoId: number | null;
  typeOfTransactionId: number;
  amount: number;
  date: string;
  observation: string;
}
