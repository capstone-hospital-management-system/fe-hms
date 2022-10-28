import { IField } from 'src/app/core/dtos/IFields';

export const appointmentFields: IField[] = [
  {
    key: 'clinic_id',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'appointment_date',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'patient_id',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'doctor_id',
    isRequired: true,
    regexPattern: '',
  },
];
