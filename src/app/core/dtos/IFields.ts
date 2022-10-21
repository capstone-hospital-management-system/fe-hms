export interface IField {
  key: string;
  label: string;
  placeholder: string;
  type: string;
  isRequired: boolean;
  regexPattern: string;
}

export interface IFields {
  [key: string]: IField[];
}
