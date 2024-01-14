export interface ResponseCreditCard{
  success: boolean;
  message: string;
  data: {creditCardDtoList: CreditCard[]};
  code: string;
}

export interface CreditCard{
  id: number;
  userId?: number;
  name: string;
  availability: number;
  balance: number;
  datelineToPay: string;
}
