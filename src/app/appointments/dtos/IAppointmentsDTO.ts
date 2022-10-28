import { IPatientResponseDTO } from './../../patients/dtos/IPatientsDTO';
import { IClinicResponseDTO } from 'src/app/clinics/dtos/IClinicsDTO';
import { IAccountResponseDTO } from 'src/app/auth/dtos/IAuth';

export interface IAppointment {
  clinic: IClinicResponseDTO;
  appointment_date: string;
  patient: IPatientResponseDTO;
  doctor: IAccountResponseDTO;
}

export interface IAppointmentResponseDTO extends IAppointment {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IAppointmentRequestDTO extends IAppointment {
  created_by: number;
  updated_by: number;
}
