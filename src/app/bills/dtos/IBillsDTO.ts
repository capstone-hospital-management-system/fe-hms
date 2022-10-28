import { IPrescriptionResponseDTO } from 'src/app/prescriptions/dtos/IPrescriptionsDTO';

export interface IBill {
  prescription: IPrescriptionResponseDTO;
  total_price: number;
}

export interface IBillResponseDTO extends IBill {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IBillRequestDTO extends IBill {}
