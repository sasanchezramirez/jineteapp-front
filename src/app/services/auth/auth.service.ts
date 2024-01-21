import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../modules/auth/models/user.model';
import { Login } from 'src/app/modules/auth/models/login.model';
import { Observable } from 'rxjs';
import { enviroment } from 'src/enviroments/enviroments.prod';


@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(user: User): Observable<any> {
    return this.http.post<any>(`${enviroment.apiUrl}/auth/register`, user);
  }

  login(login: Login): Observable<any> {
    return this.http.post<any>(`${enviroment.apiUrl}/auth/login`, login);
  }
}
