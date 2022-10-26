import { IField } from 'src/app/core/dtos/IFields';

export const clinicFields: IField[] = [
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
];
