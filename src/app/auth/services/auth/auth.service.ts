import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { ILoginRequestDTO, IAccountResponseDTO, ILoginResponseDTO } from './../../dtos/IAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signinUrl: string = `${environment.baseUrl}/auth/sign-in`;
  private meUrl: string = `${environment.baseUrl}/me`;

  constructor(private http: HttpClient) {}

  authenticate(body: ILoginRequestDTO): Observable<IBaseResponseDTO<ILoginResponseDTO>> {
    return this.http.post<IBaseResponseDTO<ILoginResponseDTO>>(this.signinUrl, body);
  }
  accountInfo(): Observable<IBaseResponseDTO<ILoginResponseDTO>> {
    return this.http.get<IBaseResponseDTO<ILoginResponseDTO>>(this.meUrl);
  }
}
