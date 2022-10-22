export interface IBill {
  prescription_id: number;
  total_price: number;
}

export interface IBillResponseDTO extends IBill {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IBillRequestDTO extends IBill {}
