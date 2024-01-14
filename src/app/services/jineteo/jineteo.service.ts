import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments.prod';
import { ResponseCreditCard } from 'src/app/modules/home/models/credit-card.model';
import { ResponseJineteoTypes } from 'src/app/modules/home/models/jineteo.model';
@Injectable({
  providedIn: 'root'
})
export class JineteoService {

  constructor(private http: HttpClient) { }

  getCreditCardsById(id: string):Observable<ResponseCreditCard> {
    const token = localStorage.getItem('accessToken'); // Obtén el token del localStorage
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<ResponseCreditCard>(`${enviroment.apiUrl}/credit-card/${id}`,{ headers: headers });
  }

  getTypesOfJineteo():Observable<ResponseJineteoTypes>{
    return this.http.get<ResponseJineteoTypes>(`${enviroment.apiUrl}/jineteo-types`)
  }

}
