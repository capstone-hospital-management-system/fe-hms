interface IField {
  key: string;
  label: string;
  placeholder: string;
  type: string;
  isRequired: boolean;
  regexPattern: string;
}

export const patientFields: IField[] = [
  {
    key: 'username',
    label: 'Username',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'first_name',
    label: 'First Name',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'last_name',
    label: 'Last Name',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'id_card',
    label: 'ID Card',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
  {
    key: 'age',
    label: 'Age',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '^[0-9]*$',
  },
  {
    key: 'gender',
    label: 'Gender',
    placeholder: '',
    type: 'select',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'blood_type',
    label: 'Blood Type',
    placeholder: '',
    type: 'select',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'bod',
    label: 'Date of Birth',
    placeholder: '',
    type: 'date',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'phone_number',
    label: 'Phone Number',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'address',
    label: 'Address',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'city',
    label: 'City',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
  {
    key: 'postal_code',
    label: 'Postal Code',
    placeholder: '',
    type: 'text',
    isRequired: true,
    regexPattern: '',
  },
];
