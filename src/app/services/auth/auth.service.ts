import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from '../../modules/auth/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {}

  register(user: User) {
    // URL del API
    const apiUrl = 'https://tuapi.com/register';
    return this.http.post(apiUrl, user);
  }
}
