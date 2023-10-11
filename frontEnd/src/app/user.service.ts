import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(public http: HttpClient, private authService: AuthService) {}
  urlBase = 'http://localhost:3000';

  signUp(userName: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.urlBase}/signup`, {
      username: userName,
      email: email,
      password: password,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.urlBase}/login`, {
      password: password,
      email: email,
    });
  }

  logOut(): Observable<any> {
    return this.http.get(`${this.urlBase}/logout`);
  }
}
