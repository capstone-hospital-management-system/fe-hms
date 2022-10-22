import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IMedicineRequestDTO, IMedicineResponseDTO } from '../dtos/IMedicinesDTO';

@Injectable({
  providedIn: 'root',
})
export class MedicinesService {
  private url: string = `${environment.baseUrl}/medicines`;

  constructor(private http: HttpClient) {}

  create(body: IMedicineRequestDTO): Observable<IBaseResponseDTO<IMedicineResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IMedicineResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IMedicineResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IMedicineResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IMedicineResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IMedicineResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IMedicineRequestDTO): Observable<IBaseResponseDTO<IMedicineResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IMedicineResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
