import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IPrescriptionRequestDTO, IPrescriptionResponseDTO } from '../dtos/IPrescriptionsDTO';

@Injectable({
  providedIn: 'root',
})
export class PrescriptionsService {
  private url: string = `${environment.baseUrl}/prescriptions`;

  constructor(private http: HttpClient) {}

  create(body: IPrescriptionRequestDTO): Observable<IBaseResponseDTO<IPrescriptionResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IPrescriptionResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IPrescriptionResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IPrescriptionResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IPrescriptionResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IPrescriptionResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IPrescriptionRequestDTO): Observable<IBaseResponseDTO<IPrescriptionResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IPrescriptionResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
