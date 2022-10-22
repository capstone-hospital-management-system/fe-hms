export interface IPrescription {
  diagnose_id: number;
  description: string;
  status: string;
  others: string;
}

export interface IPrescriptionResponseDTO extends IPrescription {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IPrescriptionRequestDTO extends IPrescription {}
