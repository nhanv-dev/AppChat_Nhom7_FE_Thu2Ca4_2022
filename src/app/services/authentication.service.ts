import {Injectable} from '@angular/core';

@Injectable({providedIn: 'root'})
export class AuthenticationService {
  public isUserAuthenticated: boolean = false;

  constructor() {
  }

  getToken() {
    const token: any = sessionStorage.getItem('userData')
    return JSON.parse(token);
  }

  setToken(token: string) {
    sessionStorage.setItem('userData', token);
  }

  removeToken() {
    sessionStorage.removeItem('userData');
  }
}
