import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { IBaseResponseDTO } from 'src/app/core/dtos/IBaseResponseDTO';
import { IAppointmentRequestDTO, IAppointmentResponseDTO } from '../dtos/IAppointmentsDTO';

@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  private url: string = `${environment.baseUrl}/medicines`;

  constructor(private http: HttpClient) {}

  create(body: IAppointmentRequestDTO): Observable<IBaseResponseDTO<IAppointmentResponseDTO>> {
    return this.http.post<IBaseResponseDTO<IAppointmentResponseDTO>>(this.url, body);
  }

  get(params?: { [key: string]: string | number }): Observable<IBaseResponseDTO<IAppointmentResponseDTO[]>> {
    return this.http.get<IBaseResponseDTO<IAppointmentResponseDTO[]>>(this.url, { params });
  }

  getById(id: number): Observable<IBaseResponseDTO<IAppointmentResponseDTO>> {
    return this.http.get<IBaseResponseDTO<IAppointmentResponseDTO>>(`${this.url}/${id}`);
  }

  update(id: number, body: IAppointmentRequestDTO): Observable<IBaseResponseDTO<IAppointmentResponseDTO>> {
    return this.http.put<IBaseResponseDTO<IAppointmentResponseDTO>>(`${this.url}/${id}`, body);
  }

  delete(id: number): Observable<IBaseResponseDTO<any[]>> {
    return this.http.delete<IBaseResponseDTO<any[]>>(`${this.url}/${id}`);
  }
}
