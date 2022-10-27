import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IDiagnoseRequestDTO, IDiagnoseResponseDTO } from '../dtos/IDiagnosesDTO';

@Injectable({
  providedIn: 'root',
})
export class DiagnosesService {
  private url: string = `${environment.baseUrl}/diagnoses`;

  constructor(private http: HttpClient) {}

  create(body: IDiagnoseRequestDTO): Observable<IBaseResponseDTO<IDiagnoseResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IDiagnoseResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IDiagnoseResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IDiagnoseResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IDiagnoseResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IDiagnoseResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IDiagnoseRequestDTO): Observable<IBaseResponseDTO<IDiagnoseResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IDiagnoseResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
