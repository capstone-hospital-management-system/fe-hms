import { IField } from 'src/app/core/dtos/IFields';

export const prescriptionFields: IField[] = [
  {
    key: 'diagnose_id',
    label: 'Diagnose',
    placeholder: '',
    type: 'select',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'medicine_ids',
    label: 'Medicines',
    placeholder: '',
    type: 'select',
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
    key: 'status',
    label: 'Status',
    placeholder: '',
    type: 'select',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'others',
    label: 'Others',
    placeholder: '',
    type: 'textarea',
    isRequired: false,
    regexPattern: '',
  },
];
