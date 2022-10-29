import { IAccountResponseDTO } from 'src/app/accounts/dtos/IAccountsDTO';
import { IClinicResponseDTO } from 'src/app/clinics/dtos/IClinicsDTO';
import { IPatientResponseDTO } from 'src/app/patients/dtos/IPatientsDTO';

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
