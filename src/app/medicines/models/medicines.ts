import { IField } from 'src/app/core/dtos/IFields';

export const medicineFields: IField[] = [
  {
    key: 'name',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'description',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'price',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
  {
    key: 'stock',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
];
