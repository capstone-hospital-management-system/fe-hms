export interface IClinic {
  name: string;
  description: string;
}

export interface IClinicResponseDTO extends IClinic {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IClinicRequestDTO extends IClinic {}
