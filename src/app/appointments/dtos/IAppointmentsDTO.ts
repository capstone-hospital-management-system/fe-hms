export interface IAppointment {
  clinic_id: string;
  appointment_date: string;
  patient_id: number;
  doctor_id: number;
}

export interface IAppointmentResponseDTO extends IAppointment {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IAppointmentRequestDTO extends IAppointment {}
