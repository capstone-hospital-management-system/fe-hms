export interface IAccount {
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  password?: string;
  role: string;
  id_card: string;
  phone_number: string;
}

export interface IAccountResponseDTO extends IAccount {
  id: number;
  created_at: number | Date;
  updated_at: number | Date;
}

export interface IAccountRequestDTO extends IAccount {}
