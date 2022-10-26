import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { ITreatmentRequestDTO, ITreatmentResponseDTO } from '../dtos/ITreatmentsDTO';

@Injectable({
  providedIn: 'root',
})
export class TreatmentsService {
  private url: string = `${environment.baseUrl}/treatments`;

  constructor(private http: HttpClient) {}

  create(body: ITreatmentRequestDTO): Observable<IBaseResponseDTO<ITreatmentResponseDTO>> {
    return this.http.post<IBaseResponseDTO<ITreatmentResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<ITreatmentResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<ITreatmentResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<ITreatmentResponseDTO>> {
    return this.http.get<IBaseResponseDTO<ITreatmentResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: ITreatmentRequestDTO): Observable<IBaseResponseDTO<ITreatmentResponseDTO>> {
    return this.http.put<IBaseResponseDTO<ITreatmentResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
