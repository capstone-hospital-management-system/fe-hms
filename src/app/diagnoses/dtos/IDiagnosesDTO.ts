export interface IDiagnose {
  appointment_id: number;
  name: string;
  description: string;
  report: string;
}

export interface IDiagnoseResponseDTO extends IDiagnose {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IDiagnoseRequestDTO extends IDiagnose {}
