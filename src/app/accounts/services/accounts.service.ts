import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IAccountRequestDTO, IAccountResponseDTO } from '../dtos/IAccountsDTO';

@Injectable({
  providedIn: 'root',
})
export class AccountsService {
  private url: string = `${environment.baseUrl}/accounts`;

  constructor(private http: HttpClient) {}

  create(body: IAccountRequestDTO): Observable<IBaseResponseDTO<IAccountResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IAccountResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IAccountResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IAccountResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IAccountResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IAccountResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IAccountRequestDTO): Observable<IBaseResponseDTO<IAccountResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IAccountResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
