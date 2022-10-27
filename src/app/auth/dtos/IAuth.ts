export interface ILoginRequestDTO {
  username_or_email: string;
  password: string;
}

export interface IAccountResponseDTO {
  id: number;
  first_name: string;
  last_name: string;
  username: string;
  email: string;
  authorities: [];
  id_card: string;
  others: string;
  phone_number: string;
}

export interface ILoginResponseDTO {
  access_token: string;
  token_type: string;
  account_info: IAccountResponseDTO;
}
