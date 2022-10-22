import { IField } from 'src/app/core/dtos/IFields';

export const billFields: IField[] = [
  {
    key: 'prescription_id',
    label: 'Prescription',
    placeholder: '',
    type: 'select',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'total_price',
    label: 'Medicines',
    placeholder: '',
    type: 'select',
    isRequired: true,
    regexPattern: '',
  },
];
