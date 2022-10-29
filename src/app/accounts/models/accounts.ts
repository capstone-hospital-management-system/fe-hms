import { IField } from 'src/app/core/dtos/IFields';

export const accountFields: IField[] = [
  {
    key: 'username',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'password',
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
    key: 'email',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'id_card',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
  {
    key: 'role',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'phone_number',
    isRequired: true,
    regexPattern: '',
  },
];
