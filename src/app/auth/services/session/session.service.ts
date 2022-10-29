import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';
import { IAccountInfo } from '../../dtos/IAuth';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  createSession(account: IAccountInfo): void {
    sessionStorage.setItem('account_info', JSON.stringify(account));
  }

  getSession(): IAccountInfo {
    return JSON.parse(sessionStorage.getItem('account_info') as string);
  }

  getAccessToken(): any {
    return localStorage.getItem('access_token');
  }

  isLogin(): boolean {
    const accessToken = localStorage.getItem('access_token');
    return accessToken ? true : false;
  }

  getEmail(): Observable<string> {
    const email = this.getSession().email;
    return of(email);
  }

  destroySession(): void {
    localStorage.clear();
    sessionStorage.clear();
  }
}
