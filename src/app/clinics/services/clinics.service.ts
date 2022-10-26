import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IClinicRequestDTO, IClinicResponseDTO } from '../dtos/IClinicsDTO';

@Injectable({
  providedIn: 'root',
})
export class ClinicsService {
  private url: string = `${environment.baseUrl}/clinics`;

  constructor(private http: HttpClient) {}

  create(body: IClinicRequestDTO): Observable<IBaseResponseDTO<IClinicResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IClinicResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IClinicResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IClinicResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IClinicResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IClinicResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IClinicRequestDTO): Observable<IBaseResponseDTO<IClinicResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IClinicResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
