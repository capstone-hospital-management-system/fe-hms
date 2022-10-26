export interface ITreatment {
  diagnose_id: number;
  report: string;
  status: string;
}

export interface ITreatmentResponseDTO extends ITreatment {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface ITreatmentRequestDTO extends ITreatment {}
