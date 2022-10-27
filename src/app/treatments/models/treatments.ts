import { IField } from 'src/app/core/dtos/IFields';

export const treatmentFields: IField[] = [
  {
    key: 'diagnose_id',
    label: 'Diagnose ID',
    placeholder: '',
    type: 'text',
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
    key: 'report',
    label: 'Report',
    placeholder: '',
    type: 'textarea',
    isRequired: true,
    regexPattern: '',
  },
];
