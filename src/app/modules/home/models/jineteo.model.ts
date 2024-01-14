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
