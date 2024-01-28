export interface ResponseTransactionList {
  success: boolean;
  message: string;
  data: {transactionDtoList: TransactionData[]};
  code: string;
}

export interface TransactionData {
  id: number;
  creditCardId: number;
  userId: number;
  typeOfJineteoId: number | null;
  typeOfTransactionId: number;
  amount: number;
  losses: number;
  date: string;
  observation: string;
}
