import { Observable, of } from 'rxjs';
import { Injectable } from '@angular/core';

import { IAccountResponseDTO } from 'src/app/auth/dtos/IAuth';

@Injectable({
  providedIn: 'root',
})
export class SessionService {
  constructor() {}

  createSession(account: IAccountResponseDTO): void {
    localStorage.setItem('account_info', JSON.stringify(account));
  }

  getSession(): IAccountResponseDTO {
    return JSON.parse(localStorage.getItem('account_info') as string);
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
  }
}
