import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IPatientRequestDTO, IPatientResponseDTO } from '../dtos/IPatientsDTO';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  private url: string = `${environment.baseUrl}/patients`;

  constructor(private http: HttpClient) {}

  create(body: IPatientRequestDTO): Observable<IBaseResponseDTO<IPatientResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IPatientResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IPatientResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IPatientResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IPatientResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IPatientResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IPatientRequestDTO): Observable<IBaseResponseDTO<IPatientResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IPatientResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
