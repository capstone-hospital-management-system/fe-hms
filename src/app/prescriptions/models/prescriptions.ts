import { IField } from 'src/app/core/dtos/IFields';

export const prescriptionFields: IField[] = [
  {
    key: 'diagnose_id',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'medicine_ids',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'description',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'status',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'others',
    isRequired: false,
    regexPattern: '',
  },
];
