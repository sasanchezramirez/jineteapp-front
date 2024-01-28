export interface Transaction{
  id?: number;
  creditCardId: number;
  userId: number;
  amount: number;
  losses?: number;
  typeOfTransactionId: number;
  typeOfJineteoId?: number;
  observation?: string;
  date: Date;
}

export interface ResponseJineteoTypes{
  success: boolean;
  message: string;
  data: {jineteo: TypeOfJineteo[]};
  code: string;
}

export interface TypeOfJineteo{
  id: number;
  description: string;
}

export interface ResponseSendTransaction{
  success: boolean;
  message: string;
  data: boolean;
  code: string;
}
