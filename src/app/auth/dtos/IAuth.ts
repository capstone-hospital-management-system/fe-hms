export interface ILoginRequestDTO {
  username_or_email: string;
  password: string;
}

export interface IAccountInfo {
  accountNonExpired: boolean;
  accountNonLocked: boolean;
  authorities: { authority: string }[];
  credentialsNonExpired: boolean;
  email: string;
  enabled: boolean;
  first_name: string;
  id: number;
  id_card: string;
  last_name: string;
  others: any;
  password: string;
  phone_number: string;
  username: string;
}

export interface ILoginResponseDTO {
  access_token: string;
  token_type: string;
  account_info: IAccountInfo;
}
