export interface ILoginRequestDTO {
  username: string;
  password: string;
}

export interface IAccountResponseDTO {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  role: string;
  id_card: string;
  others: string;
  phone_number: string;
}
