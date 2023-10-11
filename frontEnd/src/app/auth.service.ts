import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  logedIn: boolean = false;

  constructor() {}

  setLoggedIn(value: boolean): void {
    this.logedIn = value;
  }

  isLoggedIn(): boolean {
    return this.logedIn;
  }
}
