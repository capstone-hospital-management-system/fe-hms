import { IField } from 'src/app/core/dtos/IFields';

export const medicineFields: IField[] = [
  {
    key: 'name',
    label: 'Name',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'description',
    label: 'Description',
    placeholder: '',
    type: 'textarea',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'price',
    label: 'Price',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
  {
    key: 'stock',
    label: 'Stock',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
];
