import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { ILoginRequestDTO, IAccountResponseDTO } from './../../dtos/IAuth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private signinUrl: string = `${environment.baseUrl}/signin`;
  private meUrl: string = `${environment.baseUrl}/me`;

  constructor(private http: HttpClient) {}

  login(body: ILoginRequestDTO): Observable<IBaseResponseDTO<IAccountResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IAccountResponseDTO>>(this.signinUrl, body);
  }
  accountInfo() {
    return this.http.get<IBaseResponseDTO<IAccountResponseDTO>>(this.meUrl);
  }
}
