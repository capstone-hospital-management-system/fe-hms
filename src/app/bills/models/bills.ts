import { IField } from 'src/app/core/dtos/IFields';

export const billFields: IField[] = [
  {
    key: 'prescription_id',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'total_price',
    isRequired: true,
    regexPattern: '',
  },
];
