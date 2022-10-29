export interface IField {
  key: string;
  isRequired: boolean;
  regexPattern: string;
}

export interface IFields {
  [key: string]: IField[];
}
