import { IField } from 'src/app/core/dtos/IFields';

export const diagnoseFields: IField[] = [
  {
    key: 'name',
    label: 'Name',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'appointment_id',
    label: 'Appointment',
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
    key: 'report',
    label: 'Report',
    placeholder: '',
    type: 'textarea',
    isRequired: true,
    regexPattern: '',
  },
];
