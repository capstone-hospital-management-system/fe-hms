import { IField } from 'src/app/core/dtos/IFields';

export const patientFields: IField[] = [
  {
    key: 'username',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'first_name',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'last_name',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'id_card',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
  {
    key: 'age',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
  {
    key: 'gender',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'blood_type',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'bod',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'phone_number',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'address',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'city',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'postal_code',
    isRequired: true,
    regexPattern: '',
  },
];
