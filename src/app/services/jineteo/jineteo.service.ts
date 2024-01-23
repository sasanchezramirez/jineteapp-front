import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments.prod';
import { CreditCard, ResponseCreditCard, ResponseNewCreditCard } from 'src/app/modules/home/models/credit-card.model';
import { Transaction, ResponseJineteoTypes, ResponseSendTransaction } from 'src/app/modules/home/models/jineteo.model';

@Injectable({
  providedIn: 'root'
})
export class JineteoService {

  constructor(private http: HttpClient) { }

  getCreditCardsById(id: string):Observable<ResponseCreditCard> {
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ResponseCreditCard>(`${enviroment.apiUrl}/credit-card/${id}`,{ headers: headers });
  }

  newCreditCard(creditCard: CreditCard):Observable<ResponseNewCreditCard>{
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ResponseNewCreditCard>(`${enviroment.apiUrl}/new-credit-card`,creditCard);
  }

  getTypesOfJineteo():Observable<ResponseJineteoTypes>{
    return this.http.get<ResponseJineteoTypes>(`${enviroment.apiUrl}/jineteo-types`)
  }

  sendNewtransaction(transaction: Transaction):Observable<ResponseSendTransaction>{
    const token = localStorage.getItem('accessToken');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.post<ResponseSendTransaction>(`${enviroment.apiUrl}/new-transaction`,transaction);

  }

}
