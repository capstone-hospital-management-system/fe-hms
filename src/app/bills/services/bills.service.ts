import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IBillRequestDTO, IBillResponseDTO } from '../dtos/IBillsDTO';

@Injectable({
  providedIn: 'root',
})
export class BillsService {
  private url: string = `${environment.baseUrl}/bills`;

  constructor(private http: HttpClient) {}

  create(body: IBillRequestDTO): Observable<IBaseResponseDTO<IBillResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IBillResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IBillResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IBillResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IBillResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IBillResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IBillRequestDTO): Observable<IBaseResponseDTO<IBillResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IBillResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
