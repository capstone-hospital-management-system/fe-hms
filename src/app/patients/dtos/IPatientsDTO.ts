export interface IPatient {
  username: string;
  first_name: string;
  last_name: string;
  id_card: string;
  age: number;
  gender: string;
  address: string;
  city: string;
  blood_type: string;
  bod: string | Date;
  phone_number: string;
  postal_code: number;
  //register_date: string | Date;
  register_by: any;
  updated_by: any;
}

export interface IPatientResponseDTO extends IPatient {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IPatientRequestDTO extends IPatient {}
