export interface IMedicine {
  name: string;
  description: string;
  price: number;
  stock: number;
}

export interface IMedicineResponseDTO extends IMedicine {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IMedicineRequestDTO extends IMedicine {}
