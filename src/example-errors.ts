import { ValidationError } from '@nestjs/common';

export const exampleErrors: ValidationError[] = [
  {
    target: {
      description: '',
      email: '',
      handle: '',
      nestedObject: { name: '', phone: '' },
      title: '',
    },
    value: '',
    property: 'title',
    children: [],
    constraints: {
      minLength: 'title must be longer than or equal to 10 characters',
    },
  },
  {
    target: {
      description: '',
      email: '',
      handle: '',
      nestedObject: { name: '', phone: '' },
      title: '',
    },
    value: '',
    property: 'description',
    children: [],
    constraints: { isNotEmpty: 'description should not be empty' },
  },
  {
    target: {
      description: '',
      email: '',
      handle: '',
      nestedObject: { name: '', phone: '' },
      title: '',
    },
    value: '',
    property: 'handle',
    children: [],
    constraints: { isNotEmpty: 'handle should not be empty' },
  },
  {
    target: {
      description: '',
      email: '',
      handle: '',
      nestedObject: { name: '', phone: '' },
      title: '',
    },
    value: '',
    property: 'email',
    children: [],
    constraints: { isEmail: 'email must be an email' },
  },
  {
    target: {
      description: '',
      email: '',
      handle: '',
      nestedObject: { name: '', phone: '' },
      title: '',
    },
    value: { name: '', phone: '' },
    property: 'nestedObject',
    children: [
      {
        target: { name: '', phone: '' },
        value: '',
        property: 'name',
        children: [],
        constraints: { isNotEmpty: 'name should not be empty' },
      },
      {
        target: { name: '', phone: '' },
        value: '',
        property: 'phone',
        children: [],
        constraints: {
          isPhoneNumber: 'phone must be a valid phone number',
          isNotEmpty: 'phone should not be empty',
        },
      },
    ],
  },
];
